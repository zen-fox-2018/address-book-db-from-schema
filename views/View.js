class View {

    static disCreate(input) {
        console.log(`successfully create new ${input}`);
    }

    static disUpdate() {
        console.log(`successfully update data`);
    }

    static disDelete(input) {
        console.log(`successfully delete ${input}`);
    }

    static showContact(obj) {
        console.log(`${JSON.stringify(obj)}`);
    }

    static disJoin(input) {
        console.log(`successfully join ${input}`);
    }
    
    static disErr(err) {
        console.log(err)
    }

}

module.exports = View