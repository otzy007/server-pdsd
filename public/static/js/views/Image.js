/*global define, console*/

define(['jquery', 'app', 'marionette', 'vent', 'templates', 'kinetic', 'models/Layer'], function ($, App, Marionette, vent, templates, Kinetic, LayerModel) {
    "use strict";

    return Marionette.Layout.extend({
        template : templates.image,

        initialize: function (options) {
            this.listenTo(App.vent, "initStage", this.onInitStage);
            this.listenTo(App.vent, "updateStage", this.onUpdateStage);
            
            this.listenTo(this.model, "change", this.changings);
            this.listenTo(this.model, "sync", this.changings);
            
            this.options = options;
            
            var i, asset = this.model.toJSON();
            this.layers = asset.layers;
            this.assetID = asset.id;
            
            this.stage = "";
            this.sources = {};
            
            for (i = 0; i < this.layers.length; i = i + 1) {
                console.log(this.layers[i].id);
                
                var layerModel = new LayerModel({path: this.layers[i].id}),
                    self = this;
                self.i = i;
                layerModel.fetch({
                    async: false,
                    success: function (layer) {
                        self.sources[String(self.layers[self.i].index)] = {
                            id: String(self.layers[self.i].id),
                            path: "../uploads/" + layer.get("name") + layer.get("type")
                        };
                        
                        self.sources[String(1)] = {
                            id: "59df9e20-a3b5-4402-aaa4-b09f891006e8",
                            path: "../uploads/" + layer.get("name") + layer.get("type")
                        };
                    }
                });
            }
        },

        events : {
            'click #btnApply' : 'applyOperation',
            'click #btnSelect' : 'selectDisplay',
            'click #btnRender' : 'renderFile'
        },
        
        changings: function () {
            console.log("change");
        },
        
        onUpdateStage: function (options) {
            this.stage = options.stage;
        },
        
        postStage: function (assetID, dataUrl) {
            $.ajax({
                async: "false",
                type: "POST",
                url: "/assets/" + assetID,
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({"composed_image": dataUrl}, null, '\t'),
                success: function (response) {
                    console.log("success POST on /assets/:assetID");
                    console.log(response);
                    
                },
                error: function (response) {
                    console.log("error POST on /assets/:assetID");
                    console.log(response);
                }
            });
        },
        
        onInitStage: function (options) {
            this.stage = options.stage;
            var self = this;
            
            self.stage.toDataURL({
                callback: function (dataUrl) {

                    var assetID = document.getElementById('btnApply').getAttribute('data-id');
                    console.log(assetID);

                    self.postStage(assetID, dataUrl);
                }
            });
        },
        
        applyOperation: function () {
            console.log("apply");
            
            var self = this;
            self.stage.toDataURL({
                callback: function (dataUrl) {
                    var assetID = document.getElementById('btnApply').getAttribute('data-id');
                    console.log(assetID);

                    self.postStage(assetID, dataUrl);
                }
            });
        },
        
        selectDisplay: function () {
            console.log("select");
            /*
            var self = this;
            $.ajax({
                async: "false",
                type: "GET",
                url: "/select/" + self.assetID,
                dataType: 'text',
    
                success: function (response) {
                    console.log("success GET on /select/:assetID");
                },
                error: function (response) {
                    console.log("error GET on /select/:assetID");
                }
            });*/
        },
        
        renderFile: function () {
            console.log("render");
            // Let us extract the value from the textbox now 
        },
        
        regions : {},

        ui : {},

        onRender : function () {
            function update(activeAnchor) {
                var group = activeAnchor.getParent(),
                    
                    topLeft = group.find('.topLeft')[0],
                    topCenter = group.find('.topCenter')[0],
                    topRight = group.find('.topRight')[0],
                    middleRight = group.find('.middleRight')[0],
                    bottomRight = group.find('.bottomRight')[0],
                    bottomCenter = group.find('.bottomCenter')[0],
                    bottomLeft = group.find('.bottomLeft')[0],
                    middleLeft = group.find('.middleLeft')[0],
                    image = group.find('.image')[0],
                    
                    anchorX = activeAnchor.x(),
                    anchorY = activeAnchor.y();

                // update anchor positions
                switch (activeAnchor.name()) {
                case 'topLeft':
                    topRight.y(anchorY);

                    topCenter.y(anchorY);
                    topCenter.x((topLeft.x() + topRight.x()) / 2);

                    bottomLeft.x(anchorX);

                    middleLeft.x(anchorX);
                    middleLeft.y((topLeft.y() + bottomLeft.y()) / 2);

                    middleRight.y((topRight.y() + bottomRight.y()) / 2);

                    bottomCenter.x((bottomLeft.x() + bottomRight.x()) / 2);
                    break;

                case 'topCenter':
                    topRight.y(anchorY);

                    topLeft.y(anchorY);

                    middleLeft.y((topLeft.y() + bottomLeft.y()) / 2);

                    middleRight.y((topRight.y() + bottomRight.y()) / 2);
                    break;

                case 'topRight':
                    topLeft.y(anchorY);

                    topCenter.y(anchorY);
                    topCenter.x((topLeft.x() + topRight.x()) / 2);

                    bottomRight.x(anchorX);

                    middleRight.x(anchorX);
                    middleRight.y((topLeft.y() + bottomRight.y()) / 2);

                    bottomCenter.x((bottomLeft.x() + bottomRight.x()) / 2);

                    middleLeft.y((topLeft.y() + bottomLeft.y()) / 2);
                    break;

                case 'middleRight':
                    topRight.x(anchorX);

                    bottomRight.x(anchorX);

                    topCenter.x((topLeft.x() + topRight.x()) / 2);

                    bottomCenter.x((bottomLeft.x() + bottomRight.x()) / 2);
                    break;

                case 'bottomRight':
                    topCenter.x((topLeft.x() + topRight.x()) / 2);

                    bottomLeft.y(anchorY);

                    middleLeft.y((topLeft.y() + bottomLeft.y()) / 2);

                    bottomCenter.y(anchorY);
                    bottomCenter.x((bottomLeft.x() + bottomRight.x()) / 2);

                    topRight.x(anchorX);

                    middleRight.x(anchorX);
                    middleRight.y((topRight.y() + bottomRight.y()) / 2);
                    break;

                case 'bottomCenter':
                    bottomRight.y(anchorY);

                    bottomLeft.y(anchorY);

                    middleLeft.y((topLeft.y() + bottomLeft.y()) / 2);

                    middleRight.y((topRight.y() + bottomRight.y()) / 2);
                    break;

                case 'bottomLeft':
                    bottomRight.y(anchorY);
                    topLeft.x(anchorX);

                    middleLeft.x(anchorX);
                    middleLeft.y((topLeft.y() + bottomLeft.y()) / 2);

                    bottomCenter.y(anchorY);
                    bottomCenter.x((bottomLeft.x() + bottomRight.x()) / 2);

                    middleRight.y((topRight.y() + bottomRight.y()) / 2);

                    topCenter.x((topLeft.x() + topRight.x()) / 2);
                    break;

                case 'middleLeft':
                    topLeft.x(anchorX);

                    bottomLeft.x(anchorX);

                    topCenter.x((topLeft.x() + topRight.x()) / 2);

                    bottomCenter.x((bottomLeft.x() + bottomRight.x()) / 2);
                    break;
                }

                image.setPosition(topLeft.getPosition());

                var width = topRight.x() - topLeft.x(),
                    height = bottomLeft.y() - topLeft.y();

                if (width && height) {
                    image.setSize({width: width, height: height});
                    
                    App.vent.trigger("showCurrentLayerSize", {
                        "currentLayerWidth": width,
                        "currentLayerHeight" : height
                    });
                }
            }
            
            var l = 10;
            
            function addAnchor(group, x, y, name) {
                var stage = group.getStage(),
                    layer = group.getLayer(),
                    anchor = new Kinetic.Rect({
                        x: x - l / 2,
                        y: y - l / 2,
                        width: l,
                        height: l,
                        stroke: '#000',
                        fill: '#fff',
                        opacity: 0.5,
                        name: name,
                        draggable: true,
                        dragOnTop: false
                    });

                anchor.on('dragmove', function () {
                    update(this);
                    layer.draw();
                });
                
                anchor.on('mousedown touchstart', function () {
                    group.setDraggable(false);
                    this.moveToTop();
                });
                
                anchor.on('dragend', function () {
                    group.setDraggable(true);
                    layer.draw();
                });
                
                // add hover styling
                anchor.on('mouseover', function () {
                    var layer = this.getLayer();
                    
                    if (anchor.name() === 'topCenter' || anchor.name() === 'bottomCenter') {
                        document.body.style.cursor = 'ns-resize';
                    } else if (anchor.name() === 'middleLeft' || anchor.name() === 'middleRight') {
                        document.body.style.cursor = 'ew-resize';
                    } else if (anchor.name() === 'topLeft' || anchor.name() === 'bottomRight') {
                        document.body.style.cursor = 'nwse-resize';
                    } else if (anchor.name() === 'topRight' || anchor.name() === 'bottomLeft') {
                        document.body.style.cursor = 'nesw-resize';
                    }
                    this.setStrokeWidth(4);
                    layer.draw();
                });
                
                anchor.on('mouseout', function () {
                    var layer = this.getLayer();
                    document.body.style.cursor = 'default';
                    this.strokeWidth(2);
                    layer.draw();
                });
                
                // set anchors topCenter and bottomCenter to move only on vertical
                if (anchor.name() === 'topCenter' || anchor.name() === 'bottomCenter') {
                    anchor.dragBoundFunc(function (pos) {
                        return {
                            x: this.getAbsolutePosition().x,
                            y: pos.y
                        }
                    });
                }
                
                // set anchors middleLeft and middleRight to move only on horizontal
                if (anchor.name() === 'middleLeft' || anchor.name() === 'middleRight') {
                    anchor.dragBoundFunc(function (pos) {
                        return {
                            x: pos.x,
                            y: this.getAbsolutePosition().y
                        }
                    });
                }
                
                group.add(anchor);
                anchor.hide();
            }
            
            function loadImages(sources, callback) {
                console.log(sources);
                var images = {},
                    loadedImages = 0,
                    numImages = 0;
                
                // count the number of images to load
                _.each(sources, function (val, key) {
                    if (val) {
                        numImages = numImages + 1;
                    }
                });
            
                _.each(sources, function (val, key) {
                    if (val) {
                        console.log(key);
                        var id = key;
                        
                        images[id] = new Image();
                        images[id].onload = function () {
                            // initStage only after all images are loaded
                            if (++loadedImages >= numImages) {
                                callback(images);
                            }
                        };
                        images[id].src = val.path;
                    }
                });
            }
            
            function initStage(images) {
                console.log(images);
                
                var stage_width, stage_height;
                if (images[0].width < $('#container').width() && images[0].height < $('#container').height()) {
                    stage_width = images[0].width;
                    stage_height = images[0].height;
                } else {
                    stage_width = $('#container').width();
                    stage_height = $('#container').height();
                }
                
                console.log("here" + stage_width + "-" + $('#container').height());
                
                var stage = new Kinetic.Stage({
                    container: 'container',
                    width: images[0].width,
                    height: images[0].height
                });
                
                // send initial width and size
                App.vent.trigger("showInitialLayerSize", {
                    "initialLayerWidth": stage.getWidth(),
                    "initialLayerHeight" : stage.getHeight()
                });
                
                var layer = new Kinetic.Layer(),
                    bg = new Kinetic.Rect({
                        width: stage.getWidth(),
                        height: stage.getHeight(),
                        fill : 'grey',
                        x: 0,
                        y: 0
                    });
                layer.add(bg);
                
                layer.on('mousedown', function (e) {
                    var node = e.target;
                    select(node);
                });
                
                // For each layer create group and add anchors
                _.each(images, function (val, key) {
                    if (val) {
                        console.log(key);
                        
                        var group = new Kinetic.Group({
                            x: 0,
                            y: 0,
                            draggable: true
                        });
                        
                        // update W & H in Operations -> Resize
                        group.on('click', function () {
                            var image = group.find('.image')[0];
                            
                            App.vent.trigger("showCurrentLayerSize", {
                                "currentLayerWidth": image.getWidth(),
                                "currentLayerHeight" : image.getHeight()
                            });
                        });
                        
                        layer.add(group);
                        stage.add(layer);
                        
                        var img = new Kinetic.Image({
                            x: 0,
                            y: 0,
                            image: images[key],
                            name: 'image'
                        });
                        
                        group.add(img);
                        addAnchor(group, 0, 0, 'topLeft');
                        addAnchor(group, img.getWidth() / 2, 0, 'topCenter');
                        addAnchor(group, img.getWidth(), 0, 'topRight');
                        addAnchor(group, img.getWidth(), img.getHeight() / 2, 'middleRight');
                        addAnchor(group, img.getWidth(), img.getHeight(), 'bottomRight');
                        addAnchor(group, img.getWidth() / 2, img.getHeight(), 'bottomCenter');
                        addAnchor(group, 0, img.getHeight(), 'bottomLeft');
                        addAnchor(group, 0, img.getHeight() / 2, 'middleLeft');

                        group.on('dragstart', function () {
                            this.moveToTop();
                        });
                        
                        group.on('dragend', function () {
                            App.vent.trigger("updateStage", {stage: stage});
                            console.log(group.getPosition());
                        });
                        
                    }
                });
                
                stage.add(layer);
                App.vent.trigger("initStage", {stage: stage});
                
                function select(node) {
                    deselect();
                    
                    if (node.parent.nodeType = 'Kinetic.Group') {
                        var i, children = node.parent.children;
                        for (i = 1; i < children.length; i = i + 1) {
                            if (children[i].getName() === 'topLeft' ||
                                    children[i].getName() === 'topCenter' ||
                                    children[i].getName() === 'topRight' ||
                                    children[i].getName() === 'middleRight' ||
                                    children[i].getName() === 'bottomRight' ||
                                    children[i].getName() === 'bottomCenter' ||
                                    children[i].getName() === 'bottomLeft' ||
                                    children[i].getName() === 'middleLeft') {
                                children[i].show();
                            }
                        }
                    }
                }

                function deselect() {
                    var i, j, children = layer.children;

                    for (i = 1; i < children.length; i = i + 1) {
                        var grandChildren = children[i].children;

                        if (grandChildren) {
                            for (j = 1; j < grandChildren.length; j = j + 1) {
                                if (grandChildren[j].getName() === 'topLeft' ||
                                        grandChildren[j].getName() === 'topCenter' ||
                                        grandChildren[j].getName() === 'topRight' ||
                                        grandChildren[j].getName() === 'middleRight' ||
                                        grandChildren[j].getName() === 'bottomRight' ||
                                        grandChildren[j].getName() === 'bottomCenter' ||
                                        grandChildren[j].getName() === 'bottomLeft' ||
                                        grandChildren[j].getName() === 'middleLeft') {
                                    grandChildren[j].hide();
                                    layer.draw();
                                }
                            }
                        }
                    }
                }
            }
            
            loadImages(this.sources, initStage);
        }
    });
});