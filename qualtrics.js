{
    Qualtrics.SurveyEngine.addOnload(function () {
        // const cssLink = document.createElement("link");
        // const cssPlace = document.getElementById("cssPlace");
        // // <link id="PageStyleSheet" rel="stylesheet" href="Style1.css" />
        // cssLink.href = "https://cdn.jsdelivr.net/gh/hyokonbanwa/InteractiveValueResources@809b43115db7ba562ae76cf2d3fffe9cff2d3bba/" + "css/SectionOmote.css";
        // cssLink.rel = "stylesheet";
        // cssPlace.appendChild(cssLink);

        // //画面の縦横100%にする
        // const skinInner = document.querySelector(".SkinInner");
        // skinInner.classList.add("expand-section1");

        //背景色
        //const jfe = document.querySelector(".JFE");
        //jfe.classList.add("bg-danger");
        //次ボタンを隠す
        this.hideNextButton();
        //https://cdn.jsdelivr.net/gh/GifuTaro/InteractiveValueResources@main/css/SectionOmote.css
        //https://cdn.jsdelivr.net/gh/hyokonbanwa/InteractiveValueResources@314b41d7013a67b7460c1aba0509061ce9d85607/
        const buildUrlJs = "https://cdn.jsdelivr.net/gh/GifuTaro/UnityWebGLResources1@8b3c20f7d3d1f76b75c42641c706a8973bd2dfd1/Build";
        const buildUrl = "https://gifutaro.github.io/UnityWebGLResources1/Build";
        const requiredResources = ["https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js", buildUrlJs + "/dist.loader.js"];

        const loadScript = (idx) => {
            console.log("Loading ", requiredResources[idx]);
            jQuery.getScript(requiredResources[idx], function () {
                if (idx + 1 < requiredResources.length) {
                    loadScript(idx + 1);
                } else {
                    initExp();
                }
            });
        };

        const initExp = () => {
            const canvas = document.querySelector("#unity-canvas");
            const loadingBar = document.querySelector("#unity-loading-bar");
            const progressBarFull = document.querySelector("#unity-progress-bar-full");
            loadingBar.style.display = "block";

            const config = {
                dataUrl: buildUrl + "/dist.data",
                frameworkUrl: buildUrlJs + "/dist.framework.js",
                codeUrl: buildUrl + "/dist.wasm",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "DefaultCompany",
                productName: "UnityWebGL_1",
                productVersion: "0.1",
                //showBanner: unityShowBanner,
            };
            let unityInstance = null;
            createUnityInstance(canvas, config, (progress) => {
                progressBarFull.style.width = 100 * progress + "%";
            })
                .then((instance) => {
                    loadingBar.style.display = "none";
                    unityInstance = instance;
                    // fullscreenButton.onclick = () => {
                    //     unityInstance.SetFullscreen(1);
                    // };
                })
                .catch((message) => {
                    alert(message);
                });

            document.addEventListener("click", function (e) {
                if (e.target.id == "unity-canvas") {
                    // Clicked on canvas
                    unityInstance.SendMessage("Button", "FocusCanvas", "1");
                } else {
                    // Clicked outside of canvas
                    unityInstance.SendMessage("Button", "FocusCanvas", "0");
                }
            });
            const button = document.getElementById("sendButton");
            button.onclick = unitySendMessage;
            function unitySendMessage(params) {
                const webInput = document.querySelector("#exampleInput1");
                //console.log(unityInstance);
                unityInstance.SendMessage("Button", "SetInputFieldText", webInput.value);
            }
        };

        console.log("スクリプト読み込み");
        loadScript(0);

        /*ページが読み込まれたときに実行するJavaScriptをここに配置してください*/
    });

    Qualtrics.SurveyEngine.addOnReady(function () {
        //windowLoad時の操作
        console.log("window");

        // if (myLibrary != null) {
        //     myLibrary.onReady();
        // }
        /*ページが完全に表示されたときに実行するJavaScriptをここに配置してください*/
    });

    Qualtrics.SurveyEngine.addOnUnload(function () {
        //windowUnLoad時の操作
        /*ページの読み込みが解除されたときに実行するJavaScriptをここに配置してください*/
    });
}
