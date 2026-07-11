import type { JSX } from 'preact/jsx-runtime';
import { useEffect, useState, useRef, useCallback } from 'preact/hooks';
import { isSearchOpen } from './state';
import { withFeedQuery, withIqPodPublicBase } from '../lib/feed-source';
import type { Episode } from '../lib/rss';

type SearchDialogProps = {
  feed?: string;
};

export default function SearchDialog({ feed }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load episodes on mount
  useEffect(() => {
    const abortController = new AbortController();

    setEpisodes([]);
    setFilteredEpisodes([]);
    setSelectedIndex(0);

    fetch(
      withFeedQuery(withIqPodPublicBase('/api/episodes/search.json'), feed),
      {
        signal: abortController.signal
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load search episodes: ${res.status}`);
        }

        return res.json() as Promise<Episode[]>;
      })
      .then((data) => {
        setEpisodes(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error(error);
      });

    return () => abortController.abort();
  }, [feed]);

  const getEpisodeHref = useCallback(
    (episodeSlug: string) =>
      withFeedQuery(withIqPodPublicBase(`/${episodeSlug}`), feed),
    [feed]
  );

  // Filter episodes based on query
  useEffect(() => {
    if (!query.trim()) {
      setFilteredEpisodes(episodes.slice(0, 8));
      setSelectedIndex(0);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = episodes
      .filter(
        (episode) =>
          episode.title.toLowerCase().includes(lowerQuery) ||
          episode.description.toLowerCase().includes(lowerQuery) ||
          (episode.episodeNumber?.toLowerCase().includes(lowerQuery) ?? false)
      )
      .slice(0, 8);

    setFilteredEpisodes(filtered);
    setSelectedIndex(0);
  }, [query, episodes]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isSearchOpen.value) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isSearchOpen.value]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open search with cmd+k or ctrl+k
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isSearchOpen.value = !isSearchOpen.value;
        return;
      }

      // Close on escape
      if (e.key === 'Escape' && isSearchOpen.value) {
        e.preventDefault();
        isSearchOpen.value = false;
        return;
      }

      // Navigation and selection when dialog is open
      if (isSearchOpen.value && filteredEpisodes.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredEpisodes.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const selected = filteredEpisodes[selectedIndex];
          if (selected) {
            window.location.href = getEpisodeHref(selected.episodeSlug);
          }
        }
      }
    },
    [filteredEpisodes, getEpisodeHref, selectedIndex]
  );

  // Add global keyboard listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedEl = resultsRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      selectedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Handle backdrop click
  const handleBackdropClick = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      isSearchOpen.value = false;
    }
  };

  if (!isSearchOpen.value) {
    return null;
  }

  return (
    <div
      class="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[10vh] backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Search episodes"
    >
      <div class="bg-light-card dark:bg-dark-card border-light-input-border dark:border-dark-border mx-4 w-full max-w-xl overflow-hidden rounded-lg border shadow-2xl">
        {/* Search Input */}
        <div class="border-light-input-border dark:border-dark-border flex items-center border-b px-4">
          <span
            class="search-icon text-light-icon dark:text-dark-icon h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            class="text-light-text-heading placeholder-light-text-body dark:placeholder-dark-text-body flex-1 border-none bg-transparent px-4 py-4 outline-none focus:ring-0 dark:text-white"
            placeholder="Search episodes..."
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            aria-label="Search episodes"
            aria-autocomplete="list"
            aria-controls="search-results"
          />
          <kbd class="text-light-text-body dark:text-dark-text-body bg-light-input-bg dark:bg-dark-input-bg border-light-input-border dark:border-dark-input-border hidden items-center gap-1 rounded border px-2 py-1 text-xs sm:inline-flex">
            <span class="text-xs">ESC</span>
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          id="search-results"
          class="max-h-80 overflow-y-auto p-2"
          role="listbox"
        >
          {filteredEpisodes.length === 0 ? (
            <div class="text-light-text-body dark:text-dark-text-body p-4 text-center">
              {query
                ? 'No episodes found'
                : 'Start typing to search episodes...'}
            </div>
          ) : (
            filteredEpisodes.map((episode, index) => (
              <a
                key={episode.id}
                href={getEpisodeHref(episode.episodeSlug)}
                data-index={index}
                class={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                  index === selectedIndex
                    ? 'bg-light-input-bg dark:bg-dark-input-bg'
                    : 'hover:bg-light-input-bg dark:hover:bg-dark-input-bg'
                }`}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => (isSearchOpen.value = false)}
              >
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-light-icon dark:text-dark-icon text-xs font-medium">
                      #{episode.episodeNumber}
                    </span>
                    <span class="text-light-text-heading truncate text-sm font-semibold dark:text-white">
                      {episode.title}
                    </span>
                  </div>
                  <p class="text-light-text-body dark:text-dark-text-body mt-1 truncate text-xs">
                    {episode.description}
                  </p>
                </div>
                {index === selectedIndex && (
                  <kbd class="text-light-text-body dark:text-dark-text-body bg-light-card dark:bg-dark-card border-light-input-border dark:border-dark-input-border hidden items-center rounded border px-2 py-1 text-xs sm:inline-flex">
                    ↵
                  </kbd>
                )}
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div class="border-light-input-border dark:border-dark-border text-light-text-body dark:text-dark-text-body flex items-center justify-between border-t px-4 py-2 text-xs">
          <div class="flex items-center gap-4">
            <span class="hidden items-center gap-1 sm:inline-flex">
              <kbd class="bg-light-input-bg dark:bg-dark-input-bg border-light-input-border dark:border-dark-input-border rounded border px-1.5 py-0.5">
                ↑
              </kbd>
              <kbd class="bg-light-input-bg dark:bg-dark-input-bg border-light-input-border dark:border-dark-input-border rounded border px-1.5 py-0.5">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span class="hidden items-center gap-1 sm:inline-flex">
              <kbd class="bg-light-input-bg dark:bg-dark-input-bg border-light-input-border dark:border-dark-input-border rounded border px-1.5 py-0.5">
                ↵
              </kbd>
              <span>to select</span>
            </span>
          </div>
          <span>
            {filteredEpisodes.length}{' '}
            {filteredEpisodes.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>
    </div>
  );
}
