
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initMutationObserver, startCustomControlProcess } from "../../shared/utils";
import "./../../shared/index.scss"
import {DBCheckbox} from "@db-ui/react-components";
import {DBCheckboxProps} from "@db-ui/react-components/dist/components/checkbox/model";

export class DBCheckboxPA
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private overViewContainer: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private props: DBCheckboxProps = {
  };
  
	private canvasWidthState = "fixed";
	private canvasHeightState = "fixed";

  constructor() {
  }


  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    let currentPageContext = context as any;
    currentPageContext = currentPageContext
      ? currentPageContext["page"]
      : undefined;
	    if (currentPageContext) {
				this.props.children = currentPageContext.children;
				this.props.name = currentPageContext.name;
				this.props.value = currentPageContext.value;
				this.props.id = currentPageContext.id;
		    }
	    context.mode.trackContainerResize(true);
	this._notifyOutputChanged = notifyOutputChanged;
    this.overViewContainer = container;
    this.overViewContainer.setAttribute(
			'data-canvas-height-state',
			this.canvasHeightState
		);
		this.overViewContainer.setAttribute(
			'data-canvas-width-state',
			this.canvasWidthState
		);

	initMutationObserver();
	setTimeout(startCustomControlProcess, 500);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.props.children = context.parameters.children.raw || undefined;
	        this.props.name = context.parameters.name.raw || undefined;
	        this.props.value = context.parameters.value.raw || undefined;
		this.props.onChange = (event:any)=> {
	this.props.value = event?.target?.["value"] as unknown;
	this._notifyOutputChanged();
	};
            this.props.id = context.parameters.id.raw || undefined;
	        	this.props.disabled = context.mode.isControlDisabled;
        
    ReactDOM.render(
      React.createElement(DBCheckbox, this.props),
      this.overViewContainer
    );

	let shouldUpdate = false;

    	if (shouldUpdate) {
		this._notifyOutputChanged();
	}

	startCustomControlProcess();
  }

  public getOutputs(): IOutputs {
    return {
          value: this.props.value,
            };
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.overViewContainer);
  }
}



