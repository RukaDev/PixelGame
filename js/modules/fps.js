
var fps = {
    set: function(amount){
        this.amount = amount
        this.interval = 1000 / amount
        this.then = Date.now()
    },

    advance: function(){
        var now = Date.now()
        var elapsed = now - this.then

        if (elapsed > this.interval) {
            this.then = now - (elapsed % this.interval)
            return true
        }
    },
}
