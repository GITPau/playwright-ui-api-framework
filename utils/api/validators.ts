export function isValidCategory(item: unknown): boolean {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
    const obj = item as Record<string, unknown>;
    return (
        typeof obj.Name === 'string' &&
        obj.Name.length > 0 &&
        typeof obj.Number === 'string'
    );
}