export function createCommandDiv(){
        let parentDiv = document.createElement('div');
        parentDiv.className = 'command';
        let subDiv = document.createElement('div');
        subDiv.className = "lineNumber"
        parentDiv.appendChild(subDiv)
        let textarea = document.createElement('textarea');
        // textarea.rows = 40;
        // textarea.cols = 40;
        parentDiv.appendChild(textarea);
        document.body.appendChild(parentDiv)
}
