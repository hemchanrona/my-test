import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NodeModel,
  ConnectorModel,
  LayoutModel,
  Diagram,
  DataSourceModel
} from "@syncfusion/ej2-diagrams";
import { DataManager } from "@syncfusion/ej2-data";
import {
  SnapSettingsModel,
  SnapConstraints,
  DiagramTools,
  NodeConstraints
} from "@syncfusion/ej2-angular-diagrams";
export interface EmployeeInfo {
  Name: string;
  ReportTo?: string;
  Role: string;
  Tooltip: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  // @ViewChild("diagram")
  public layout: LayoutModel;
  public dataSourceSettings: DataSourceModel;
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  public tool: DiagramTools = DiagramTools.ZoomPan;
  public data: Object[] = [
    {
      Name: "Finished Goods",
      Role: "FinishedGoods",
      Tooltip: "Goods for Sale",
    },
    {
      Name: "Intermediate Product 1",
      ReportTo: "Finished Goods",
      Role: "IntermediateProd",
      Tooltip: "Products for produce finished goods" ,
    },
    {
      Name: "Raw Material 1",
      ReportTo: "Intermediate Product 1",
      Role: "RawMaterial",
      Tooltip: "Raw materials for produce intermediate product" ,

    },
    {
      Name: "Raw Material 2",
      ReportTo: "ntermediate Product 1",
      Role: "RawMaterial",
      Tooltip: "Raw materials for produce intermediate product" ,
    },
    {
      Name: "Intermediate Product 2",
      ReportTo: "Finished Goods",
      Role: "IntermediateProd",
      Tooltip: "Products for produce finished goods" ,
    },
    {
      Name: "Intermediate Product 3",
      ReportTo: "Finished Goods",
      Role: "IntermediateProd",
      Tooltip: "Products for produce finished goods" ,
    },
    {
      Name: "Raw Material 3",
      ReportTo: "Intermediate Product 3",
      Role: "RawMaterial",
      Tooltip: "Raw materials for produce intermediate product" ,
    }
  ];



  public nodeDefaults(node: NodeModel): NodeModel {
    let codes: Object = {
      FinishedGoods: "rgb(0, 139,139)",
      IntermediateProd: "rgb(30, 30,113)",
      RawMaterial: "rgb(0, 100,0)"
    };
    node.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
    node.width = 300;
    node.height = 100;
    node.annotations = [
      {
        content: (node.data as EmployeeInfo).Name,
        style: { color: "white" }
      }
    ];
    node.style.fill = codes[(node.data as EmployeeInfo).Role];
    // node.Tooltip.content = (node.data as EmployeeInfo).Tooltip;
    let tooltipContent: HTMLElement = document.createElement("div");
    tooltipContent.innerHTML =
      `<div style="background-color: black; font-family: Arial, Helvetica, sans-serif; color: #fff; border-width:1px;border-style: solid;border-color: black; border-radius: 8px;white-space: nowrap;"> <span style="margin: 10px;">${(node.data as EmployeeInfo).Tooltip}</span> </div>`;
    node.tooltip.content = tooltipContent;
    return node;
  }

  public connectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = "Orthogonal";
    connector.targetDecorator.shape = "None";
    connector.cornerRadius = 7;
    return connector;
  }
  ngOnInit(): void {
    this.layout = {
      type: "OrganizationalChart"
    };
    this.dataSourceSettings = {
      id: "Name",
      parentId: "ReportTo",
      dataManager: new DataManager(this.data as JSON[])
    };
  }
}
