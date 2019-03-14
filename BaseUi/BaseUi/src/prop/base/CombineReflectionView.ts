 
module prop {

    export class CombineReflectionView extends MetaDataView {

        private list: Array<MetaDataView>
        public constructor() {
            super();
            this.list=[]
        }
        public addView($view: MetaDataView): void {
            this.list.push($view)
        }
        public refreshViewValue(): void {
            for (var i: number = 0; i < this.list.length; i++) {
                this.list[i].top = i * 100 + this.top;
                this.list[i].refreshViewValue();
            }
            super.refreshViewValue();
        }
        public destory(): void {
            while (this.list.length) {
                var temp: MetaDataView = this.list.pop();
                temp.destory();
            }
            super.destory()
        }
        public resize(): void {
            super.resize()
            for (var i: number = 0; this.list&&i < this.list.length; i++) {
                this.list[i].width = this.width
                this.list[i].resize();
            }
        }
    }
}