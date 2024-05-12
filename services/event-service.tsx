let events = {};

const subscribeToEvent = (eventName: string, callback: Function) =>{
    if(!events[eventName]) {
        events[eventName] = [];
    }

    events[eventName].push(callback);
}

const publishEvent = (eventName: string, data: any) => {
    if(events[eventName]) {
        events[eventName].forEach((callback: Function) => {
            callback(data);
        });
    }
}

export { subscribeToEvent, publishEvent };