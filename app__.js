Ext.define("XrouteMvvm.GoogleMaps", {
    extend: "Ext.ux.google.Api",
    requiresGoogle: [{api: "maps", version: "3", other_params: "libraries=geometry&sensor=false"}]
});
Ext.define("XrouteMvvm.model.Base", {
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [{name: "id", type: "int"}],
    schema: {
        namespace: "XrouteMvvm.model",
        urlPrefix: "resources/service.php",
        proxy: {
            type: "ajax",
            url: "{prefix}/{entityName:lowercase}/read",
            actionMethods: {read: "POST"},
            reader: {type: "json", rootProperty: "data"}
        }
    }
});
Ext.define("XrouteMvvm.model.Customer", {
    extend: "XrouteMvvm.model.Base",
    fields: [{name: "name", type: "string"}, {name: "addrStreet", type: "string"}, {
        name: "addrCity",
        type: "string"
    }, {
        name: "address", persist: false, calculate: function (b) {
            return Ext.String.format("{0}, {1}, {2}", b.addrStreet, b.addrCity, b.addrCountry)
        }
    }, {name: "addrCountry", type: "string"}]
});
Ext.define("XrouteMvvm.view.Map", {
    extend: "Ext.panel.Panel",
    alias: "widget.map",
    mapOptions: {mapTypeId: "roadmap", zoom: 12},
    markCustomer: true,
    html: '<div style="display:table;width:100%;height:100%"><div style="display:table-cell;vertical-align:middle;text-align:center"><h2>Please select a customer</h2></div></div>',
    config: {address: null, customer: null},
    updateAddress: function (d) {
        var c = this;
        if (!d) {
            return
        }
        if (c.isVisible()) {
            c.lookupAddress()
        } else {
            c.on("show", c.lookupAddress, c, {single: true})
        }
    },
    bind: {address: "{customer.address}", customer: "{customer}"},
    lookupAddress: function () {
        var d = this, e = d.getAddress(), f = d.map;
        if (!e) {
            return
        }
        d.geocoder = new google.maps.Geocoder();
        d.geocoder.geocode({address: e}, Ext.Function.bind(d.onLookupComplete, d))
    },
    onLookupComplete: function (h, f) {
        var j = this, k = Ext.apply({}, j.mapOptions), g;
        if ("OK" !== f) {
            Ext.Msg.alert("Error", "Cannot geocode address: " + j.getAddress());
            return
        }
        g = h[0].geometry.location;
        if (!j.map) {
            k.center = g;
            j.renderMap(k)
        } else {
            j.map.panTo(g)
        }
        if (j.markCustomer) {
            j.addMarker(h[0])
        }
    },
    renderMap: function (d) {
        var c = this;
        c.map = new google.maps.Map(c.body.dom, d)
    },
    addMarker: function (f) {
        var d = this, e = {map: d.map, position: f.geometry.location, title: d.getCustomer().get("name")};
        if (d.marker) {
            d.marker.setMap(null)
        }
        d.marker = new google.maps.Marker(e)
    },
    constructor: function () {
        if (XrouteMvvm.app.log) {
            console.info("Map::constructor")
        }
        this.callParent(arguments)
    },
    initComponent: function () {
        this.callParent(arguments);
        if (XrouteMvvm.app.log) {
            console.info("Map::initComponent")
        }
    }
});
Ext.define("XrouteMvvm.view.CustomersGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.customersgrid",
    config: {customer: null},
    updateCustomer: function (d, e) {
        var f = this.getSelectionModel();
        if (d && d.isModel) {
            f.select(d)
        } else {
            f.deselectAll()
        }
        if (e) {
            f.deselect(e)
        }
    },
    bind: {store: "{customers}", customer: "{customer}"},
    publishes: ["customer"],
    listeners: {scope: "this", select: "onCustomerSelect"},
    onCustomerSelect: function (d, c) {
        this.setCustomer(c)
    },
    columns: [{
        text: "Customer",
        dataIndex: "name",
        flex: 1.5,
        editor: {bind: "{customer.name}", selectOnFocus: true}
    }, {
        text: "Street",
        dataIndex: "addrStreet",
        flex: 2,
        editor: {bind: "{customer.addrStreet}", selectOnFocus: true}
    }, {
        text: "City",
        dataIndex: "addrCity",
        flex: 2,
        editor: {bind: "{customer.addrCity}", selectOnFocus: true}
    }, {
        text: "Country",
        dataIndex: "addrCountry",
        width: 80,
        editor: {bind: "{customer.addrCountry}", selectOnFocus: true}
    }],
    constructor: function () {
        if (XrouteMvvm.app.log) {
            console.info("CustomersGrid::constructor")
        }
        this.callParent(arguments)
    },
    initComponent: function () {
        if (XrouteMvvm.app.log) {
            console.info("CustomersGrid::initComponent")
        }
        this.callParent(arguments)
    }
});
Ext.define("XrouteMvvm.view.CustomersView", {
    extend: "Ext.view.View",
    alias: "widget.customersview",
    config: {customer: null},
    updateCustomer: function (d, e) {
        var f = this.getSelectionModel();
        if (d && d.isModel) {
            f.select(d)
        } else {
            f.deselectAll()
        }
        if (e) {
            f.deselect(e)
        }
    },
    bind: {store: "{customers}", customer: "{customer}"},
    publishes: ["customer"],
    listeners: {
        scope: "this", select: "onCustomerSelect", beforecontainerclick: function () {
            return false
        }
    },
    onCustomerSelect: function (d, c) {
        this.setCustomer(c)
    },
    itemTpl: '<div class="customer"><div><b>{name}</b></div><div>{addrStreet}</div><div>{addrCity}</div><div>{addrCountry}</div></div>',
    itemSelector: "div.customer",
    autoScroll: true,
    selectedItemCls: "selected",
    overItemCls: "over",
    constructor: function () {
        if (XrouteMvvm.app.log) {
            console.info("CustomersView::constructor")
        }
        this.callParent(arguments)
    },
    initComponent: function () {
        if (XrouteMvvm.app.log) {
            console.info("CustomersView::initComponent")
        }
        this.callParent(arguments)
    }
});
Ext.define("XrouteMvvm.view.Main", {
    extend: "Ext.tab.Panel",
    alias: "widget.main",
    controller: "main",
    viewModel: {type: "main"},
    config: {tab: null},
    updateTab: function (b) {
        this.setActiveTab(b)
    },
    publishes: ["tab"],
    bind: {tab: "{tab}", title: "<b>{customer.name}</b>"},
    listeners: {scope: "this", tabchange: "onTabChange"},
    onTabChange: function (d, c) {
        this.setTab(c)
    },
    header: {title: "Please select a customer"},
    tabBarHeaderPosition: 2,
    items: [{
        itemId: "grid",
        title: "Grid",
        xtype: "customersgrid",
        glyph: 61646,
        hideMode: "offsets"
    }, {
        itemId: "view",
        title: "View",
        xtype: "customersview",
        glyph: 61450
    }, {
        itemId: "map",
        title: "Map",
        xtype: "map",
        glyph: 61505
    }],
    constructor: function () {
        if (XrouteMvvm.app.log) {
            console.info("Main::constructor")
        }
        this.callParent(arguments)
    },
    initComponent: function () {
        if (XrouteMvvm.app.log) {
            console.info("Main::initComponent")
        }
        this.callParent(arguments)
    }
});
Ext.define("XrouteMvvm.Application", {
    extend: "Ext.app.Application",
    name: "XrouteMvvm",
    views: ["Main"],
    models: ["Customer"],
    log: false,
    launch: function () {
        var b = Ext.get("example-ct") || Ext.getBody();
        Ext.create({xtype: "main", renderTo: b, border: true, width: 740, height: 620});
        XrouteMvvm.main = Ext.ComponentQuery.query("main")[0];
        XrouteMvvm.map = XrouteMvvm.main.down("map");
        XrouteMvvm.vm = XrouteMvvm.main.getViewModel();
        if (XrouteMvvm.app.log) {
            console.info("Application::launch")
        }
    },
    constructor: function (b) {
        if (this.log) {
            console.info("Application::constructor")
        }
        this.callParent(arguments)
    },
    init: function () {
        if (this.log) {
            console.info("Application::init")
        }
        this.callParent(arguments)
    }
});
Ext.define("XrouteMvvm.mixin.Router", {
    extend: "Ext.Mixin",
    alias: "mixin.router",
    defaultRoute: "!grid",
    mixinConfig: {after: {initViewModel: "afterInitViewModel", init: "afterInit"}},
    afterInit: function (b) {
        Ext.app.route.Router.application.on({scope: this, unmatchedroute: this.onUnmatchedRoute})
    },
    afterInitViewModel: function (d) {
        var c = this;
        d.bind("{customer}", c.onCustomerChange, c);
        d.bind("{tab}", c.onTabChange, c)
    },
    beforeProcessRoute: function (e, g, h) {
        var f = this.getViewModel().getStore("customers");
        if (!f.loadCount) {
            f.on({load: h.resume, single: true})
        } else {
            h.resume()
        }
    },
    processRoute: function (f, h) {
        var k = this, g = k.getViewModel(), j;
        if (f) {
            k.getView().setActiveTab(f)
        }
        if (h) {
            j = g.getStore("customers").getById(h);
            g.set("customer", j)
        }
        if (XrouteMvvm.app.log) {
            console.info("Router::processRoute", f, h)
        }
    },
    onCustomerChange: function (b) {
        this.redirectTo(this.createHash(null, b))
    },
    onTabChange: function (b) {
        this.redirectTo(this.createHash(b))
    },
    createHash: function (e, g) {
        var h = window.location.hash, f = h ? h.split("/") : [], e = e && e.getItemId ? e.getItemId() : e, g = g && g.getId ? g.getId() : g;
        f[0] = e ? "!" + e : (f[0] ? f[0] : this.defaultRoute);
        if (g) {
            f[1] = g
        }
        return f.join("/")
    },
    onUnmatchedRoute: function (b) {
        console.log("onUnmatchedRoute", b);
        this.redirectTo(this.defaultRoute)
    }
});
Ext.define("XrouteMvvm.view.MainController", {
    extend: "Ext.app.ViewController",
    alias: "controller.main",
    mixins: {router: "XrouteMvvm.mixin.Router"},
    routes: {
        "!:tab/:id": {
            action: "processRoute",
            before: "beforeProcessRoute",
            conditions: {":id": "(\\b[1-9][0-9]*\\b|)", ":tab": "(grid|view|map)"}
        }, "!:tab": {action: "processRoute", conditions: {":tab": "(grid|view|map)"}}
    },
    initViewModel: function (b) {
        if (XrouteMvvm.app.log) {
            console.info("MainController::initViewModel")
        }
    },
    constructor: function () {
        if (XrouteMvvm.app.log) {
            console.info("MainController::constructor")
        }
        this.callParent(arguments)
    },
    init: function () {
        if (XrouteMvvm.app.log) {
            console.info("MainController::init")
        }
        this.callParent(arguments)
    }
});
Ext.define("XrouteMvvm.view.MainModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.main",
    data: {customer: null},
    stores: {customers: {model: "Customer", autoLoad: true}},
    constructor: function () {
        if (XrouteMvvm.app.log) {
            console.info("MainModel::constructor")
        }
        this.callParent(arguments)
    }
});
Ext.scopeCss = true;
Ext.setGlyphFontFamily("FontAwesome");
Ext.application({name: "XrouteMvvm", extend: "XrouteMvvm.Application"});