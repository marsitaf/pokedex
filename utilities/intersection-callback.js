export function intersectionCallback(entries, disconect, callback) {
    for (const entry of entries) {
        const { isIntersecting, intersectionRatio } = entry;
        if (isIntersecting  && intersectionRatio >= 0) {
            if(disconect) {
                this.observer = this.observer.disconnect();
                break
            } 
            callback()
        }
    };
}