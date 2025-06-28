import { Pencil, Layers, Smartphone } from 'lucide-react'

const features = [
  {
    icon: Pencil,
    title: 'Effortless Note-Taking',
    description: 'Capture your ideas quickly and easily with our intuitive interface.',
  },
  {
    icon: Layers,
    title: 'Smart Organization',
    description: 'Automatically categorize and tag your notes for easy retrieval.',
  },
  {
    icon: Smartphone,
    title: 'Cross-Device Syncing',
    description: 'Access your notes from anywhere, on any device, always in sync.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-[3vw] font-bold mb-4">About Idea Forge</h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Idea Forge is your digital canvas for capturing, organizing, and nurturing ideas. Our mission is to empower creative minds and boost productivity through seamless note-taking and idea management.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-700 rounded-lg p-6 shadow-lg"
            >
              <feature.icon className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

