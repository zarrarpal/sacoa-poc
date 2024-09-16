import type HCEApplication from "./HCEApplication";
import NFCTagType4, { NFCContentType } from './NFCTagType4';
declare class HCESession {
    /**
     * Initializes and controls the session of HCE session.
     * @param application HCE application to initialize.
     */
    constructor(application: HCEApplication);
    /**
     * Stops the HCE session.
     */
    terminate: () => Promise<void>;
    /**
     * Starts the HCE session.
     */
    start: () => Promise<this>;
    application: any;
    /**
     * Indication, if the session is still active.
     */
    active: boolean;
}
export default HCESession;
export { NFCTagType4, NFCContentType };
