
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import "./hover-lookup-control";

export class HoverLookup implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private context: ComponentFramework.Context<IInputs>;
  private notifyOutputChanged: () => void;
  private selectedId: string | null = null;
  private selectedName: string | null = null;
private litElement: any;
  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
    this.context = context;
    this.notifyOutputChanged = notifyOutputChanged;
    this.container = container;

    const el = document.createElement('ctk-hoverlookup-control') as any;
    this.litElement = el;
    this.litElement.uniqueId = "info-btn-" + Math.random().toString(36).substr(2, 9); // unique ID
    el.context = context;
    el.addEventListener('select', (e: any) => {
      this.selectedId = e.detail.id;
      this.selectedName = e.detail.name;
      this.notifyOutputChanged();
    });
    el.addEventListener('clear', () => {
      this.selectedId = null;
      this.selectedName = null;
      this.notifyOutputChanged();
    });
    container.appendChild(el);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.context = context;
    //lookupValue = context.parameters.lookup.raw || [];
    //this.litElement.context = context;
    //this.litElement.lookupText =  context.parameters.lookup.raw && context.parameters.lookup.raw.length > 0 ? context.parameters.lookup.raw[0].name  : "NODATA";
    this.litElement.lookupValue = context.parameters.lookup.raw || [];
   // alert("updateView called");
    //this.litElement.triggerRender();
  }

  public getOutputs(): IOutputs {
    return {
      lookup: this.selectedId ? [{ id: this.selectedId, entityType: "account", name: this.selectedName ? this.selectedName:"No Name" }] : []
    };
  }
  public setFilter(filter: string): void {
    alert("setFilter called with: " + filter);
  }

  public destroy(): void {}
}
