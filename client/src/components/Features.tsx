import { BellAlertIcon, MapPinIcon, DeviceTabletIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Accident Detection',
    description:
      'Automatically detects accidents using advanced IoT sensors and triggers alerts instantly.',
    icon: BellAlertIcon,
  },
  {
    name: 'Real-Time Location Sharing',
    description:
      'Sends the real-time location of the rider to emergency contacts for quick rescue.',
    icon: MapPinIcon,
  },
  {
    name: 'Easy Device Integration',
    description:
      'Seamless device configuration and account linking via a user-friendly web interface.',
    icon: DeviceTabletIcon,
  },
  {
    name: 'Enhanced Rider Safety',
    description:
      'Built-in features ensure proactive measures to enhance rider safety and survivability.',
    icon: ShieldCheckIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-indigo-600">SmartHelm Features</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Revolutionizing Rider Safety
          </p>
          <p className="mt-6 text-lg text-gray-600">
            The SmartHelm is designed to safeguard motorbike riders through state-of-the-art IoT technologies. From accident detection to real-time alerts, it ensures timely support when it matters most.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
