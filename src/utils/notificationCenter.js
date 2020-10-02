const Notifications = {
    TAB_BAR_ADD_CLICKED: 'tabBarAddClicked',
    NEW_OPERATION_SELECTED: 'newOperationSelected',
}

class NotificationCenter {

    observers = {};

    static instance = null;
    static createInstance() {
        var object = new NotificationCenter();
        return object;
    }
  
    static default() {
        if (!NotificationCenter.instance) {
            NotificationCenter.instance = NotificationCenter.createInstance();
        }
        return NotificationCenter.instance;
    }

    addListener(listener, event) {
        if(!this.observers[event]) {
            this.observers[event] = []
        }
        this.observers[event].push(listener)
    }

    removeListener(listener, event) {
        if(this.observers[event]) {
            this.observers[event].pop(listener)   
        }
    }

    postNotification(event, obj) {
        if (this.observers[event]) {
            this.observers[event].forEach(function(element) {
                element(event, obj)
            });
        }
    }
}

export { NotificationCenter, Notifications }