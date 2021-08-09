export function copyObjectToClipboard(data) {
    if(typeof data !== "object") return "";
    const keys = Object.keys(data)
    const stringData = keys.map(name => {
        return `${name}: ${data[name]}`
    }).join(", ");
    
    navigator.clipboard.writeText(stringData)
}