/**
 * Configuration file for Walpola Sri Rathanasara School website.
 * 
 * To receive form submissions directly to your email, you can use a free service
 * like Formspree or Web3Forms.
 * 
 * How to use:
 * 1. Fill in either the Formspree URL or the Web3Forms Access Key below.
 * 2. The application will automatically route Contact/Inquiry and Admission form submissions to your email!
 */

export const FORM_CONFIG = {
  // Option 1: Formspree URL
  // Paste your unique Formspree form URL here.
  // Example: "https://formspree.io/f/mvgnorqy"
  FORMSPREE_URL: "",

  // Option 2: Web3Forms Access Key
  // Paste your Web3Forms Access Key here.
  // Example: "12345678-abcd-1234-abcd-1234567890ab"
  WEB3FORMS_ACCESS_KEY: "94dd7b32-153f-4e9a-ac45-8d9c363bf727",
};

/**
 * Sends form data to Formspree or Web3Forms depending on what is configured.
 * If neither is configured, it runs in simulated mode (for local testing/live preview).
 */
export async function submitFormToEmail(
  formData: Record<string, any>, 
  formType: 'Inquiry' | 'Admission'
): Promise<{ success: boolean; error?: string; simulated?: boolean }> {
  const { FORMSPREE_URL, WEB3FORMS_ACCESS_KEY } = FORM_CONFIG;

  const payload: Record<string, any> = {
    ...formData,
    form_type_label: `${formType} Form Submission`,
    submitted_at: new Date().toLocaleString()
  };

  try {
    // 1. Formspree Route
    if (FORMSPREE_URL && FORMSPREE_URL.trim() !== "") {
      const response = await fetch(FORMSPREE_URL.trim(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        return { success: true, simulated: false };
      } else {
        const data = await response.json().catch(() => ({}));
        return { success: false, error: data.error || `HTTP error ${response.status}` };
      }
    } 
    
    // 2. Web3Forms Route
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim() !== "") {
      const web3Payload = {
        access_key: WEB3FORMS_ACCESS_KEY.trim(),
        subject: `[${formType}] New Submission - Walpola Sri Rathanasara school`,
        from_name: formData.name || formData.parentName || "School Website",
        ...payload
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(web3Payload)
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        return { success: true, simulated: false };
      } else {
        return { success: false, error: data.message || `Web3Forms error` };
      }
    }

    // 3. Fallback: Simulated mode (for live preview testing)
    return { success: true, simulated: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Network request failed" };
  }
}
