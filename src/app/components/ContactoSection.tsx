import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Globe, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';

export function ContactoSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Mensaje enviado con éxito!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contacto@ortegacaballero.edu',
      link: 'mailto:contacto@ortegacaballero.edu',
      color: 'from-[#0F172A] to-[#1E293B]',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+34 123 456 789',
      link: 'tel:+34123456789',
      color: 'from-[#1E293B] to-[#334155]',
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Campus Universitario, Madrid',
      link: '#',
      color: 'from-[#334155] to-[#475569]',
    },
  ];

  const socialLinks = [
    {
      icon: Globe,
      name: 'Scholar',
      url: 'https://scholar.google.com',
      color: 'hover:bg-[#4285F4]',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      color: 'hover:bg-[#0077B5]',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: 'https://twitter.com',
      color: 'hover:bg-[#1DA1F2]',
    },
    {
      icon: MessageSquare,
      name: 'ORCID',
      url: 'https://orcid.org',
      color: 'hover:bg-[#A6CE39]',
    },
  ];

  return (
    <section id="contacto" className="py-28 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 bg-muted rounded-full border border-border text-muted-foreground text-sm mb-4">
            Ponte en Contacto
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Contacto
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Estamos aquí para responder tus preguntas y colaborar contigo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 lg:p-10 rounded-3xl border border-border shadow-2xl bg-card hover:border-primary transition-all">
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Envíanos un Mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Nombre Completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border-border focus:border-primary focus:ring-primary bg-background text-foreground"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border-border focus:border-primary focus:ring-primary bg-background text-foreground"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border-border focus:border-primary focus:ring-primary bg-background text-foreground"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border-border focus:border-primary focus:ring-primary bg-background text-foreground resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all group"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="block"
                >
                  <Card className="p-6 rounded-3xl border border-border shadow-lg hover:shadow-2xl transition-all bg-card hover:border-primary">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <info.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">{info.title}</h4>
                        <p className="text-slate-600">{info.value}</p>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="overflow-hidden rounded-3xl border-none shadow-xl">
                <div className="relative h-64 bg-slate-900">
                  {/* Placeholder for map */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]">
                    <div className="text-center text-white">
                      <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                      <p className="text-lg font-semibold">Campus Universitario</p>
                      <p className="text-sm opacity-90">Madrid, España</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 rounded-3xl border border-border shadow-xl bg-card">
                <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                  Síguenos en Redes
                </h4>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 bg-muted ${social.color} hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-md hover:shadow-xl text-muted-foreground`}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
