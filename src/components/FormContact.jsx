import { Toaster, toast } from 'sonner'
import { useState } from 'react';
import { 
    SECRET_KEY,
    SITE_KEY,
    ENDPOINT,
    EMAIL
 } from 'astro:env/client';

export default function FormContact({i18n}) {
    const [isSending, setIsSending] = useState(false);
    const resetForm = () => {
        document.getElementById('contactForm').reset();
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target))
        
        fields.secret_key = SECRET_KEY;
        fields.addressee = EMAIL;
        fields.asunto = "Contacto desde la web - de: " + fields.name;
        if(!isSending){
            setIsSending(true);
            grecaptcha.ready(function() {
                grecaptcha.execute(SITE_KEY, { action: 'contacto' }).then(function(getToken) {
                    fields.token = getToken;
                    sendForm(fields);
                });
            });
        }
    }
    const sendForm = (fields) => {
        fetch (ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            //console.log(response)
            if (!response.ok) {
                return response.json().then(err => {
                    throw err;
                });
            }
            return response.json()
        })
        .then(data => {
            //console.log(data)
            toast.success(i18n.form.success)
            resetForm()
        })
        .catch(error => {
            //console.error(error)
            if (error.errors) {
                const formErrors = error.errors;
                for (let field in formErrors) {
                    if (formErrors.hasOwnProperty(field)) {
                        toast.warning(formErrors[field]);
                        break;
                    }
                }
            }else if(error.message){
                toast.error(error.message)
            }
            //toast.error('No se pudo enviar el mensaje vuelva a intentarlo más tarde.')
        })
        .finally(() => {
            setIsSending(false);
        })
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                method="post"
                id="contactForm"
                className="grid grid-cols-1 gap-8 p-6 mx-auto mb-16 max-w-screen-md bg-white border border-primary shadow-sm lg:mb-28 sm:grid-cols-2"
            >
                <Toaster richColors position="top-right" />
                <div className="sm:col-span-2">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">{i18n.form.nameTitle} *</label>
                    <input type="text" name="name"
                        className="block p-3 w-full text-sm text-gray-900 placeholder:text-semiBlack bg-gray-50 border border-primary shadow-sm focus:ring-2 focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder={i18n.form.namePlaceholder}
                        required
                    />
                </div>
                <div>
                <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900">{i18n.form.phoneTitle} *</label>
                <input type="tel" name="phone"
                    className="block p-3 w-full text-sm text-gray-900 placeholder:text-semiBlack bg-gray-50 border border-primary shadow-sm focus:ring-2 focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder={i18n.form.phonePlaceholder}
                    required
                />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">{i18n.form.emailTitle} </label>
                    <input
                        type="email"
                        name="email"
                        className="shadow-sm bg-gray-50 border border-primary text-gray-900 placeholder:text-semiBlack text-sm focus:ring-2 focus:outline-none focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder={i18n.form.emailPlaceholder}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="mensaje" className="block mb-2 text-sm font-medium text-gray-900">{i18n.form.messageTitle} *</label>
                    <textarea
                        name="message"
                        rows="6"
                        className="block p-2.5 w-full text-sm text-gray-950 placeholder:text-semiBlack bg-gray-50 shadow-sm border border-primary focus:ring-2 focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder={i18n.form.messagePlaceholder}
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end sm:col-span-2">
                    <button type="submit" disabled={isSending} className="py-3 px-5 font-medium text-center text-semiBlack border border-primary sm:w-fit hover:bg-tertiary hover:text-white focus:ring-2 focus:outline-none focus:ring-tertiary">{isSending ? i18n.form.button.isSending : i18n.form.button.send }</button>
                </div>
            </form>
        </>
    )
}