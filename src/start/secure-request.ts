import { type FetchEvent } from "@solidjs/start/server";
import { h3Attacher, handleSecurityHeaders } from "../lib/helpers/h3.js";
import { attachSecHeaders } from "../lib/security-headers/attach-sec-headers.js";
import { type SecHeaders } from "../lib/types.js";

export const secureRequest =
	(options?: Partial<SecHeaders>) => (event: FetchEvent) => {
		const { csp, nonce, ...secHeaders } = handleSecurityHeaders(options);

		const addHeader = h3Attacher(event.nativeEvent);
		attachSecHeaders(secHeaders, addHeader);

		if (csp) {
			addHeader(csp.name, csp.value);
		}

		event.locals.nonce = nonce;
	};
