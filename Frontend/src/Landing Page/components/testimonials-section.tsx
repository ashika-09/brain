
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    content: 'Idea Forge has revolutionized the way I manage my projects. It\'s intuitive, powerful, and keeps all my ideas organized.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Michael Chen',
    role: 'UX Designer',
    content: 'As a designer, I need a tool that can keep up with my creative process. Idea Forge does that and more. It\'s become an essential part of my workflow.',
    image: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-[3vw] font-bold text-center mb-12"
        >
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-zinc-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-[50%] h-16 w-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-zinc-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-zinc-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

