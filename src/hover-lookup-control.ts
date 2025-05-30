import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { provideFluentDesignSystem, fluentTextField, fluentButton, fluentOption, fluentListbox, fluentTooltip, fluentBadge } from '@fluentui/web-components';


provideFluentDesignSystem().register(
  fluentTextField(), fluentButton(), fluentOption(), fluentListbox(), fluentTooltip(), fluentBadge()
);

@customElement('ctk-hoverlookup-control')
export class CtkLookupControl extends LitElement {
  @property({ type: Object }) context: any;
  @property({ type: Array }) records: any[] = [];
  @property({ type: String }) search: string = '';
  @property({ type: String }) uniqueId: string = '';
  @property({ type: Array }) lookupValue: any[] = [];
  infoCache: any = {};
  //@property({ type: String }) lookupText: string = '';
  static styles = css`
    :host {
      display: block;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      background: #f5f5f5;
    padding-left: 10px;
    border-radius: 3px;
    }
    fluent-text-field {
      flex-grow: 1;
    }
      .input-wrapper > div:first-child {
    flex-grow: 1;
    } 

    
    .tooltip-content {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 6px;
      padding: 8px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      z-index: 9999;
      white-space: nowrap;
      display: none;
    }
      
    :host(:hover) .tooltip-content {
      display: block;
    }

    .lookup-badge{
        background-color: rgb(235, 243, 252);
    }
        .lookup-badge:hover {
         background-color: rgb(207, 228, 250);
}
  `;

  render() {

    if (this.context.parameters.lookup.raw == null || this.context.parameters.lookup.raw == undefined || this.context.parameters.lookup.raw.length == 0) {
      return html`
      <div class="input-wrapper">
        <fluent-text-field
          placeholder="Search accounts"
          @input=${this.onSearch}
          class="lookup-input"
        >
        <fluent-button slot="end" appearance="stealth" @click=${this.onSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

  </fluent-button>
        </fluent-text-field>
      </div>
      `
    } else {
      return html`
      <div class="input-wrapper">
      <div>
        <fluent-badge class="lookup-badge" appearance="light">${this.lookupValue.length > 0 ? this.lookupValue[0].name : ""}</fluent-badge>
</div>
         <fluent-button class="tooltip-button"  id=${this.uniqueId}      @mousemove=${this.showTooltip}
        @mouseleave=${this.hideTooltip} slot="end" appearance="stealth" aria-label="Info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>

      </fluent-button>
                <fluent-button slot="end" appearance="transparent" @click=${this.clear}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>


                </fluent-button>
        <!-- <fluent-button slot="end" appearance="transparent" @click=${this.openLookupDialog}>🔍</fluent-button> -->
        <fluent-button slot="end" appearance="stealth" @click=${this.onSearch}>
          
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

  </fluent-button>
      </div>
         <div class="tooltip-content">This is additional info on hover.</div>
      `

    }
    ;
  }
  showTooltip(event: MouseEvent) {
    // const button = this.querySelector(this.uniqueId) as HTMLElement;
    // const tooltip = this.querySelector(this.uniqueId+"-tooltip") as HTMLElement;

    // const rect = button.getBoundingClientRect();
    // tooltip.style.left = `${rect.left}px`;
    // tooltip.style.top = `${rect.bottom + 4}px`;
    // tooltip.style.display = 'block';


    if (this.lookupValue.length > 0) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const button = this.renderRoot.querySelector('.tooltip-button') as HTMLElement;
      const content = this.renderRoot.querySelector('.tooltip-content') as HTMLElement;
      //content.style.left = `10px`;
      //content.style.top = `10px`;
      const rect = this.getBoundingClientRect();//button.getBoundingClientRect();
      const rectContent = content.getBoundingClientRect();

      content.style.left = `${rect.top + 10}px`;
      content.style.top = `${rect.left + 10}px`;

      // content.style.left = `${mouseX + 10}px`;
      // content.style.top = `${mouseY + 10}px`;
      content.style.display = 'block';
      // content.innerHTML = `This is additional information shown on hover.<b>You can add more details here.</b>`;
      content.innerHTML = `No additional information available.`;
      content.style.backgroundColor = 'lightblue';


      if (this.infoCache[this.lookupValue[0].id]) {
        content.innerHTML = `<table>
      <tr><td><b>Field 1:</b></td><td>${this.lookupValue[0].id}</td></tr>
      <tr><td><b>Field 2:</b></td><td>${this.infoCache[this.lookupValue[0].id]}</td></tr>  
    </table>`;
      } else {
        Xrm.WebApi.retrieveRecord("account", this.lookupValue[0].id, "?$select=telephone1,websiteurl").then((result: any) => {
          this.infoCache[this.lookupValue[0].id] = result.telephone1 + ' | ' + result.websiteurl;
          content.innerHTML = `<table>
        <tr><td><b>Field 1:</b></td><td>${this.lookupValue[0].id}</td></tr>      
        <tr><td><b>Field 2:</b></td><td>${this.infoCache[this.lookupValue[0].id]}</td></tr>  
      </table>`;
        });
      }

    } else {
      this.hideTooltip();
    }
  }

  hideTooltip() {
    // const tooltip = this.querySelector(this.uniqueId+"-tooltip") as HTMLElement;
    // tooltip.style.display = 'none';

    const content = this.renderRoot.querySelector('.tooltip-content') as HTMLElement;
    content.style.display = 'none';
  }
  firstUpdated() {
    document.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('ctk-hoverlookup-control')) {
        this.removeDropdown();
      }
    });
  }

  onSearch(e: Event) {
    //const input = e.target as HTMLInputElement;
    const input = this.renderRoot.querySelector('.lookup-input') as HTMLInputElement
    if (!input) {
      this.search = '';
    } else {
      this.search = input.value;
    }
    if (this.search.length >= 3 || this.search.length === 0) {
      this.context.webAPI
        .retrieveMultipleRecords(
          'account',
          `?$select=name,emailaddress1,modifiedon,accountid&$filter=contains(name,'${this.search}')`
        )
        .then((res: any) => {
          this.records = res.entities;
          this.showDropdown(input);
        })
        .catch((err: unknown) => console.error('Fetch failed', err));
    } else {
      this.records = [];
      this.removeDropdown();
    }
  }

  showDropdown(input: HTMLInputElement) {
    this.removeDropdown();

    const rect = input.getBoundingClientRect();
    const dropdown = document.createElement('fluent-listbox');
    dropdown.style.position = 'absolute';
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;
    dropdown.style.width = `${rect.width}px`;
    dropdown.style.zIndex = '9999';
    dropdown.style.maxHeight = '200px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.background = 'white';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    dropdown.id = 'lookup-dropdown';

    this.records.forEach(record => {
      const option = document.createElement('fluent-option');
      option.textContent = `${record.name} (${record.emailaddress1})`;
      option.onclick = () => this.select(record);
      dropdown.appendChild(option);
    });

    document.body.appendChild(dropdown);
  }

  removeDropdown() {
    const existing = document.getElementById('lookup-dropdown');
    if (existing) {
      existing.remove();
    }
  }

  select(record: any) {
    this.removeDropdown();
    this.dispatchEvent(new CustomEvent('select', { detail: { id: record.accountid, name: record.name }, bubbles: true }));
  }

  clear() {
    this.removeDropdown();
    this.records = [];
    this.dispatchEvent(new CustomEvent('clear', { bubbles: true }));
  }

  openLookupDialog() {
    const viewId = null;
    const entityType = 'account';
    Xrm.Utility.lookupObjects({
      entityTypes: ["account"],
      allowMultiSelect: false,
    }).then(result => {
      if (result?.length) {
        //alert(`Selected Account: ${result[0].name}`);
        this.context.webAPI.retrieveMultipleRecords("account", `?$select=name,emailaddress1,modifiedon&$filter=contains(name,'${result[0].name}')`).then((res: { entities: { fulnamelname: string; emailaddress1: string; modifiedon: string; accountid: string }[] }) => {
          this.records = res.entities;
          return true; // satisfy eslint promise/always-return
        })
          .catch((err: unknown) => {
            console.error("Failed to fetch accounts:", err);
          });
        this.dispatchEvent(new CustomEvent('select', { detail: { id: result[0].id, name: result[0].name }, bubbles: true }));
      }
      return true; // satisfy eslint promise/always-return
    })
      .catch((err: unknown) => {
        console.error("Failed to fetch accounts:", err);
      });
    // this.context.utils?.openLookupDialog?.(
    //   [{ entityTypes: [entityType], viewId, viewType: 0 }],
    //   { allowMultiSelect: false },
    //   (selected: any[]) => {
    //     if (selected?.length) {
    //       this.dispatchEvent(new CustomEvent('select', { detail: { id: selected[0].id, name: selected[0].name }, bubbles: true }));
    //     }
    //   },
    //   (error: any) => console.error('Lookup dialog error:', error)
    // );
  }
}


// {
//   // Notes

//   //define data for lookupOptions
// var lookupOptions =
// {
//    defaultEntityType: "account",
//    entityTypes: ["account"],
//    allowMultiSelect: false,
//    defaultViewId:"0D5D377B-5E7C-47B5-BAB1-A5CB8B4AC10",
//    viewIds:["0D5D377B-5E7C-47B5-BAB1-A5CB8B4AC10","00000000-0000-0000-00AA-000010001003"],
//    searchText:"Allison",
//    filters: [{filterXml: "<filter type='or'><condition attribute='name' operator='like' value='A%' /></filter>",entityLogicalName: "account"}]
// };

// // Get account records based on the lookup Options
// Xrm.Utility.lookupObjects(lookupOptions).then(
//   function(success){
// console.log(success);},
// function(error){console.log(error);});
// }