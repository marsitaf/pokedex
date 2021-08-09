export function cloneObject(object) {
    try {
        return JSON.parse(JSON.stringify(object));
    } catch (error) {
        console.error("[CloneObject]", error);
        return undefined;
    }
}