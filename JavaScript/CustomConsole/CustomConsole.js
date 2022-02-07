(function () {

    /*
        To trap errors and see them in the console, wrap the solution in a "try{ <solution_code> }catch(e){console.log(e)}" statememt
    */

    window._CustomConsole = function() {

        // setup
        var consoleWindow = window.open("", "Console", "width=600,height=800", true);
        consoleWindow.document.write('<!DOCTYPE html><html><head><style>#Console,#DOM{border:1px solid black;width:100%;height:46vh;max-height:46vh;overflow-y:auto;}</style><title>Custom Console</title></head><body><div>Console Log:</div><div id="Console"></div><div>DOM Log:</div><div id="DOM"></div></body></html>');

        var consoleLogEl = consoleWindow.document.getElementById("Console")
        var domLogEl = consoleWindow.document.getElementById("DOM");

        // tracking
        var currConsoleLineId = 0;
        var currDomLineId = 0;

        this.log = function () {
            var args = arguments;

            var output = '';
            output += '<div class="console-block">';

            output += '<div class="lineId">Console Line: ' + currConsoleLineId + '</div>';
            currConsoleLineId++;

            for (var i = 0; i < args.length; i++) {
                output += '<div class="console-block-entry">';
                output += args[i];
                output += '</div>';
            }

            output += '</div>';
            output += '</br>';
            consoleLogEl.innerHTML += output;
            consoleLogEl.scrollTop = consoleLogEl.scrollHeight;

        }

        // get all levels
        document.body.onclick = function (e) {

            var output = '';
            output += '<div class="DOM-block">';

            output += '<div class="lineId">DOM Line: ' + currDomLineId + '</div>';
            currDomLineId++;

            var parentLevel = 0;
            for (var prop in e.path) {
                if (e.path[prop].nodeName == "BODY") {
                    break;
                }

                var newDiv = document.createElement("div");
                output += '<div>Parent Level: ' + parentLevel + '</div>';
                newDiv.className = "DOM-block-entry";
                newDiv.textContent = e.path[prop].outerHTML;
                output += newDiv.outerHTML;


                parentLevel++;
            }

            output += '</br>';
            domLogEl.innerHTML += output;
        }

    }
})();