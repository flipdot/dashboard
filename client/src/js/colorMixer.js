function ColorMixer(defaultR, defaultG, defaultB){
    var self = this;
    
    function sliderChangedHandler(){
        
        var newR = sliderR.getValue();
        var newG = sliderG.getValue();
        var newB = sliderB.getValue();
        
        self.R(newR);
        self.G(newG);
        self.B(newB);
    };
    
    function updateColorResult(){
        $('#colorResult').css('background', 'rgb('+self.R()+','+
                                                   self.G()+','+
                                                   self.B()+')');
    }
    
    var sliderR = $('input[data-slider-id="slider_R"]').slider()
        .on('slide', sliderChangedHandler)
        .data('slider');
    var sliderG = $('input[data-slider-id="slider_G"]').slider()
        .on('slide', sliderChangedHandler)
        .data('slider');
    var sliderB = $('input[data-slider-id="slider_B"]').slider()
        .on('slide', sliderChangedHandler)
        .data('slider');
        
    self.R = ko.createObserable(defaultR, function (newValue) {
        sliderR.setValue(newValue);
        updateColorResult();
    });
    
    self.G = ko.createObserable(defaultG, function (newValue) {
        sliderG.setValue(newValue);
        updateColorResult();
    });
    
    self.B = ko.createObserable(defaultB, function (newValue) {
        sliderB.setValue(newValue);
        updateColorResult();
    });
    
    // set the inital state for the colorResult
    updateColorResult();
}