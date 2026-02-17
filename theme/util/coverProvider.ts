let covers = [
    'cto32.jpg',
    'cto33.png',
    'cto34.png',
    'cto35.png',
    'cto36.png',
    'cto37.png',
    'cto38.png',
    'cto39.png',
    'dd177.png',
    'dd178.png',
    'dd179.png',
    'dd181.png',
    'dd183.png',
    'dd184.png',
    'dd185.png',
    'dd187.png',
    'dd188.png',
    'dd189.png',
    'dd190.png',
    'dd191.png',
    'dd192.png',
    'dd193.png',
    'dd194.png',
    'dd195.png',
    'dd196.png',
    'dd197.png',
    'dd198.png',
    'dd200.png',
    'dd201.png',
    'special176.png',
    'special180.png',
    'special182.png',
    'special_Weihnachtsfolge_2025.png',
    'special_ct_webdev_2025.png',
    'special_devcom-gamescom.png',
    'special_fluttercon-droidcon.png'
]

class CoverProvider {
    
    covers: string[] = [...covers]
    
    constructor() {
        this.shuffle()
    }

    private shuffle() {
        for (let i = this.covers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.covers[i], this.covers[j]] = [this.covers[j], this.covers[i]];
        }
    }
    
    getCovers(count: number) {
        if (this.covers.length < count) {
            this.covers = [...covers]
            this.shuffle()
        }
        return this.covers.splice(0, count)
    }
}

const coverProvider = new CoverProvider();

export default coverProvider;
