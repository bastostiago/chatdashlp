"use client";

import config from "@config/config.json";
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";
import { useState } from "react";
import { set } from "date-fns";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const result = await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify({ email: email, subject: subject, message: message, name: name })
    });
    const data = await result.json();
    if (data.success) {
      setSuccess(true);
    } else {
      setError(true);
    }

  }

  return (
    <section className="section">
      <Banner title={title} />
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            />
          </div>
          <div className="animate lg:col-5">
            <form
              method="POST"
              onSubmit={sendEmail}
              className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
            >
              <h2 className="h4 mb-6">Envie uma Mensagem</h2>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="name"
                >
                  Nome
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  placeholder="Nome Completo"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="subject"
                >
                  Assunto
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  placeholder="Assunto do E-mail"
                  type="text"
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  Mensagem
                </label>
                <textarea 
                  className="form-textarea w-full" 
                  placeholder="Sua Mensagem"
                  onChange={(e) => setMessage(e.target.value)}
                  rows="6" />
              </div>
              <button type="submit" className="btn btn-primary block w-full">
                Enviar
              </button>
              {error && (
                  <div className="mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                    <span className="font-medium">Erro!</span> Erro ao enviar mensagem, confira os campos e tente novamente.
                  </div>
              )}
              {success && (
                  <div className="mt-4 p-4 mb-4 text-sm text-dark rounded-lg bg-secondary" role="alert">
                    <span className="font-medium">Enviado!</span> Recebemos o seu contato e responderemos o mais breve possível.
                  </div>
              )}
            </form>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
