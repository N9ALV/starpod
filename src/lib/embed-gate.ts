const DEFAULT_ALLOWED_PARENTS = [
  'https://iu.com.au',
  'https://*.iu.com.au',
  'https://iqpod.tradegpt.ai',
  'https://*.iqpod.tradegpt.ai'
];

export interface EmbedGateConfig {
  enabled: boolean;
  allowTopLevel: boolean;
  allowedParents: string[];
  pinCode: string;
  storageKey: string;
}

export interface EmbedGateDecision {
  enabled: boolean;
  allowTopLevel: boolean;
  inIframe: boolean;
  unlocked: boolean;
  allowedParentOrigin?: string | null;
}

function parseList(value: string | undefined) {
  if (!value) return [];
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;

  return fallback;
}

function parseOriginPattern(pattern: string) {
  const match = pattern
    .trim()
    .toLowerCase()
    .match(/^(https?):\/\/([^/:]+)(?::(\d+))?$/);

  if (!match) return undefined;

  return {
    protocol: `${match[1]}:`,
    hostnamePattern: match[2],
    port: match[3] ?? ''
  };
}

function matchesHostnamePattern(hostname: string, pattern: string) {
  if (pattern.startsWith('*.')) {
    const suffix = pattern.slice(1);
    return hostname.endsWith(suffix) && hostname !== suffix.slice(1);
  }

  return hostname === pattern;
}

export function matchesOriginPattern(origin: string, pattern: string) {
  const parsedPattern = parseOriginPattern(pattern);
  if (!parsedPattern) return false;

  try {
    const parsedOrigin = new URL(origin);
    const normalizedHostname = parsedOrigin.hostname.toLowerCase();

    if (parsedOrigin.protocol.toLowerCase() !== parsedPattern.protocol) {
      return false;
    }

    if (parsedPattern.port && parsedOrigin.port !== parsedPattern.port) {
      return false;
    }

    if (!parsedPattern.port && parsedOrigin.port) {
      return false;
    }

    return matchesHostnamePattern(
      normalizedHostname,
      parsedPattern.hostnamePattern
    );
  } catch {
    return false;
  }
}

export function getAllowedParentOrigin(
  candidates: string[],
  allowedParents: string[]
) {
  for (const candidate of candidates) {
    if (
      allowedParents.some((pattern) => matchesOriginPattern(candidate, pattern))
    ) {
      return candidate;
    }
  }

  return null;
}

export function shouldRequireEmbedGate({
  enabled,
  allowTopLevel,
  inIframe,
  unlocked,
  allowedParentOrigin
}: EmbedGateDecision) {
  if (!enabled || unlocked) {
    return false;
  }

  if (!inIframe) {
    return !allowTopLevel;
  }

  return !allowedParentOrigin;
}

export function getEmbedGateConfig(): EmbedGateConfig {
  const allowedParents = parseList(
    import.meta.env.PUBLIC_IFRAME_GATE_ALLOWED_PARENTS as string | undefined
  );

  return {
    enabled: parseBoolean(
      import.meta.env.PUBLIC_IFRAME_GATE_ENABLED as string | undefined,
      true
    ),
    allowTopLevel: parseBoolean(
      import.meta.env.PUBLIC_IFRAME_GATE_ALLOW_TOP_LEVEL as string | undefined,
      true
    ),
    allowedParents:
      allowedParents.length > 0 ? allowedParents : DEFAULT_ALLOWED_PARENTS,
    pinCode:
      (import.meta.env.PUBLIC_IFRAME_GATE_PIN as string | undefined)?.trim() ||
      '131342',
    storageKey:
      (import.meta.env.PUBLIC_IFRAME_GATE_STORAGE_KEY as string | undefined)?.trim() ||
      'iqpodGateUnlocked'
  };
}
