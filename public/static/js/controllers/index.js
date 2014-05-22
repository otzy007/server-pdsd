define(['app',
        'backbone',
        'vent',
        'views/IndexHeader',
        'views/Login',
        'views/Register',
        'models/FilesCollection',
        'views/FilesCollection',
        'views/Body',
        'views/Header',
        'views/Footer',
        'views/UploadFile',
        'views/SearchPanel',
        'views/EditFile',
        'views/Operations',
        'views/Image',
        'views/Layers',
        'views/SelectDevice',
        'views/Devices',
        'views/Device',
        'views/RenderAsset',
        'views/Display',
        'models/User',
        'models/File',
        'models/Layer',
        'models/Asset'
       ],
       function (app,
                  Backbone,
                  vent,
                  IndexHeaderView,
                  LoginView,
                  RegisterView,
                  FilesCollectionModel,
                  FilesCollectionView,
                  BodyView,
                  Header,
                  Footer,
                  UploadFile,
                  SearchPanel,
                  EditFileView,
                  OperationsView,
                  ImageView,
                  LayersView,
                  SelectDeviceView,
                  DevicesView,
                  DeviceView,
                  RenderAssetView,
                  DisplayView,
                  UserModel,
                  FileModel,
                  LayerModel,
                  AssetModel
                 ) {
        "use strict";

        return {
            initialize: function (options) {
                this.options = options;
                
                this.user_model = new UserModel();
            },
            
            index: function () {
                var user_model = new UserModel();
                app.header.show(new Header({
                    model: user_model,
                    tab: ''
                }));
                //app.footer.show(new Footer(app.options));
                
            },

            conversations: function () {
                var user_model = new UserModel();
                app.header.show(new Header({
                    model: user_model,
                    tab: 'conversations'
                }));
                //app.footer.show(new Footer(app.options));
                
            },

            showConversation: function () {
                var user_model = new UserModel();
                app.header.show(new Header({
                    model: user_model,
                    tab: ''
                }));
                //app.footer.show(new Footer(app.options));
                
            },

            friends: function () {
                var user_model = new UserModel();
                app.header.show(new Header({
                    model: user_model,
                    tab: 'friends'
                }));
                //app.footer.show(new Footer(app.options));
                
            },
            
            register: function () {
                app.body.show(new RegisterView({
                    model: this.user_model
                }));
                
                //app.footer.show(new Footer(app.options));
            },
            
            login: function () {
                app.body.show(new LoginView({
                    model: this.user_model
                }));
                //app.footer.show(new Footer(app.options));
            },

            listFiles: function () {
                app.header.show(new Header({
                    model: this.user_model
                }));

                this.collection = new FilesCollectionModel();
                
                var self = this;
                this.collection.fetch({
                    success: function (files) {
                        var filesView = new FilesCollectionView({ collection: self.collection });

                        app.body.show(new BodyView({
                            searchPanel: new SearchPanel(),
                            uploadFile: new UploadFile(),
                            filesView: filesView
                        }));
                    }
                });
                app.footer.show(new Footer(app.options));
            },

            editFile: function (path) {
                //console.log("path in controller" + path);
                app.header.show(new Header({
                    model: this.user_model
                }));
                
                var layerModel = new LayerModel();
                this.model = new AssetModel({path: path});
                
                var self = this;
                this.model.fetch({
                    success: function (asset) {
                        app.body.show(new EditFileView({
                            operations: new OperationsView({
                                model: layerModel
                            }),
                            image: new ImageView({
                                model: self.model,
                                path: path
                            }),
                            layers: new LayersView()
                        }));
                    }
                });

                app.footer.show(new Footer(app.options));
            }
        };
    });
