module editscene {
    import Panel = win.Panel;
 
    import UIConatiner = Pan3d.UIConatiner
 
    export class EditLeftPanel extends Panel {
        public static leftPanel: EditLeftPanel
        public addUIContainer($container: UIConatiner): void {
             super.addUIContainer($container)
        }
        public removeUIContainer($container: UIConatiner): void {
            super.removeUIContainer($container)
  
        }
        public resize(): void {
            super.resize()
            for (var i: number = 0; i < this.children.length; i++) {
                this.children[i].resize()

            }
    
        }
       

    }
}