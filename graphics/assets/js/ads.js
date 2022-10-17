const ads = nodecg.Replicant('assets:ads');
const ad_settings = nodecg.Replicant('ad_settings', {defaultValue: {"visible": true}});

ads.on('change', (value) => {
    setupAds(value);
})

nodecg.readReplicant('assets:ads', value => {
    setupAds(value);
});

ad_settings.on('change', (value) => {
    if(value.visible){
        $("#ads_container").removeClass("ads_hidden");
    }else{
        $("#ads_container").addClass("ads_hidden");
    }
})

nodecg.readReplicant('ad_settings', value => {
    if(value.visible){
        $("#ads_container").removeClass("ads_hidden");
    }else{
        $("#ads_container").addClass("ads_hidden");
    }
});


var responsiveSlider = function () {

    var slider = document.getElementById("ads_loop");
    var sliderWidth = slider.offsetWidth;
    var slideList = document.getElementById("ads_list");
    var count = 1;
    var items = slideList.querySelectorAll("li").length;

    window.addEventListener('resize', function () {
        sliderWidth = slider.offsetWidth;
    });

    var nextSlide = function () {
        if (count < items) {
            slideList.style.left = "-" + count * sliderWidth + "px";
            count++;
        }
        else if (count = items) {
            slideList.style.left = "0px";
            count = 1;
        }
    };

    setInterval(function () {
        nextSlide()
    }, 3500);

};


function setupAds(value){
    try{
        if (typeof value !== 'undefined') {
            console.log(value);
            $("#ads_list").html("");
            value.forEach(ad => {
                console.log(`Adding ad ${ad.base}`);
                $("#ads_list").append(`<li class="ads_item"><img class="ads" src="${ad.url}"></li>`);
            });
        } else {
            throw "no ads";
        }
    }catch (e) {
        console.log(e);
    }finally{
        responsiveSlider();
    }
}