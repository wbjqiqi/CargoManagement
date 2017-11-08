import { ElementUIComponent } from './component'

export type AlertType = 'success' | 'warning' | 'info' | 'error'

/** Alert Component */
export declare class ElAlert extends ElementUIComponent {
  /** Title */
  title: string

  /** Component type */
  type: AlertType

  /** Descriptive text. Can also be passed with the default slot */
  description: string

  /** If closable or not */
  closable: boolean

  /** Customized close button text */
  closeText: string

  /** If a type icon is displayed */
  showIcon: boolean
}
