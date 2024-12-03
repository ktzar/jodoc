window.addEventListener('DOMContentLoaded', function () {
    const diagram = new go.Diagram("myDiagramDiv", {
        layout: new go.TreeLayout({ angle: 0, nodeSpacing: 300, layerSpacing: 90 })
    });
    const defaultBlock = () => {
        return new go.TextBlock({ margin: 2 }).bind("text", "text");
    }
    const eventTemplate =
        new go.Node("Auto", { background: "lightblue", })
            .add(new go.Shape("Rectangle", { fill: "lightblue" }))
            .add(defaultBlock());
    const commsTemplate =
        new go.Node("Auto", { background: "lightgreen", })
            .add(new go.Shape("Rectangle", { fill: "lightgreen" }))
            .add(defaultBlock());
    const analyticsTemplate =
        new go.Node("Auto", { background: "purple", })
            .add(new go.Shape("Rectangle", { fill: "lavender" }))
            .add(defaultBlock());
    const servicesTemplate =
        new go.Node("Auto", { background: "yellow", })
            .add(new go.Shape("Rectangle", { fill: "lightyellow" }))
            .add(defaultBlock());
    const graphQLTemplate =
        new go.Node("Auto", { background: "yellow", })
            .add(new go.Shape("Rectangle", { fill: "lightcoral" }))
            .add(defaultBlock());
    const screenshotTemplate =
        new go.Node("Auto", { background: "yellow", })
            .add(new go.Shape("Rectangle", { fill: "black" }))
            .add(new go.Picture({
                margin: 2,
                width: 75,
                height: 75,
                background: "white",
            }).bind("source", "imageSource"))

    const templMap = new go.Map();
    templMap.set("screenshot", screenshotTemplate);
    templMap.set("comms", commsTemplate);
    templMap.set("service", servicesTemplate);
    templMap.set("event", eventTemplate);
    templMap.set("analytics", analyticsTemplate);
    templMap.set("graphql", graphQLTemplate);

    diagram.nodeTemplateMap = templMap;
    diagram.linkTemplate =
        new go.Link({ curve: go.Curve.Bezier })
            .add(
                new go.Shape(),
                new go.Shape({ toArrow: "Standard" })
            );

    diagram.groupTemplate = new go.Group("Vertical",
        { layout: new go.TreeLayout({ angle: 0, nodeSpacing: 30, layerSpacing: 90 }) }
    )
        .add(
            new go.TextBlock({ alignment: go.Spot.Left, font: "Bold 12pt Sans-Serif" }).bind("text"),
            new go.Panel("Auto").add(
                new go.Shape("RoundedRectangle", {
                    parameter1: 10,
                    fill: "rgba(128,128,128,0.33)"
                }),
                new go.Placeholder({ padding: 5 })
            ),
        );

    diagram.model = new go.GraphLinksModel(diagramData.nodes, diagramData.links);
    diagram.addDiagramListener("BackgroundSingleClicked", function(e) {
        diagram.scale = 1;
        diagram.centerRect(diagram.actualBounds);
    });
    window.diagram = diagram;
});

function toggleType(type, checkbox) {
    window.diagram.nodes
        .filter(n => n.data.category === type)
        .each(n => n.visible = checkbox.checked);
}
