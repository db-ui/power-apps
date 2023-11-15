
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initMutationObserver, startCustomControlProcess } from "../../shared/utils";
import "./../../shared/index.scss"
import { DBTagProps } from "@db-ui/react-components/dist/components/tag/model";
import {DBTag} from "@db-ui/react-components";

export class DBTagPA
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private overViewContainer: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private props: DBTagProps = {
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
        this.props.children = context.parameters.children.raw || undefined;
	        this.props.variant = context.parameters.variant.raw || undefined;
	            
    ReactDOM.render(
      React.createElement(DBTag, this.props),
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
            };
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.overViewContainer);
  }
}



