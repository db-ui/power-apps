
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initMutationObserver, startCustomControlProcess } from "../../shared/utils";
import "./../../shared/index.scss"
import {DBInputProps} from "@db-ui/react-components/dist/components/input/model";
import {DBInput} from "@db-ui/react-components";

export class DBInputPA
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private overViewContainer: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private props: DBInputProps = {
  };
  
	private canvasWidthState = "controlled";
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
				this.props.label = currentPageContext.label;
				this.props.placeholder = currentPageContext.placeholder;
				this.props.value = currentPageContext.value;
				this.props.icon = currentPageContext.icon;
				this.props.iconAfter = currentPageContext.iconAfter;
				this.props.variant = currentPageContext.variant;
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
        this.props.label = context.parameters.label.raw || undefined;
	        this.props.placeholder = context.parameters.placeholder.raw || undefined;
	        this.props.value = context.parameters.value.raw || undefined;
		this.props.onChange = (event:any)=> {
	this.props.value = event?.target?.["value"] as unknown;
	this._notifyOutputChanged();
	};
            this.props.icon = context.parameters.icon.raw || undefined;
	        this.props.iconAfter = context.parameters.iconAfter.raw || undefined;
	        this.props.variant = context.parameters.variant.raw || undefined;
	        	this.props.disabled = context.mode.isControlDisabled;
        
    ReactDOM.render(
      React.createElement(DBInput, this.props),
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



