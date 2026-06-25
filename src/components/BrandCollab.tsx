import { motion } from 'motion/react';

export default function BrandCollab() {
  const brands = [
    {
      name: "Luminous",
      url: "https://i.pinimg.com/736x/c1/45/fb/c145fb77e37a599d2eb2c67a37fa9dc6.jpg"
    },
    {
      name: "Tata Power",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRXrOXV4bAN0hdXtOjDPbgRLat5e_pt1RnnA&s"
    },
    {
      name: "Brand 3",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-o5wNw4PzSDFslmdjKp9a7GEgzFdWCF117g&s"
    },
    {
      name: "Brand 4",
      url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTV68l9xM1Hu3mhUEidnn2nfUbHIofBAcFdb13GpMrarbbAvv2HT2bNi2DaYfdOZGN79gj8oZkcu86UKP3AeT7cYqPWRFBwG6gj7p-3kQ5XwKX5611MR6hE"
    },
    {
      name: "Brand 5",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-aFsLovYxeB-KtiH5_X04L1N7qrquE-w-hA&s"
    },
    {
      name: "Brand 6",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsqL1UaZMclvVXfpqtbkk6IOogUdDBxEFegw&s"
    },
    {
      name: "Brand 7",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XoPCnUE9x3lgu2PLDHNnG8-ChVM6LHpMcw&s"
    },
    {
      name: "Websol",
      url: "https://images.jdmagicbox.com/comp/south_24_parganas/h9/9999p3210.3210.151103162542.k4h9/catalogue/websol-energy-systems-ltd-corporate-office-south-24-parganas-corporate-companies-45mv1hhubo.jpg"
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-slate-50/30 border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6 md:mb-8">
          In Collaboration with Trusted Brands &amp; Partners
        </p>
        
        {/* Horizontal Infinite/Flex Scroll */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-16">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="h-10 md:h-12 flex items-center justify-center filter grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <img
                src={brand.url}
                alt={brand.name}
                className="h-full w-auto object-contain max-w-[120px] md:max-w-[150px] mix-blend-multiply"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
