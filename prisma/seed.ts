import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database for Source by Zahid...');

  // 1. Create Default Admin User
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: 'admin@sourcebyzahid.com' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('AdminPassword123!', 10);
    await prisma.adminUser.create({
      data: {
        name: 'Zahid',
        email: 'admin@sourcebyzahid.com',
        passwordHash,
        role: 'ADMIN',
      },
    });
    console.log('Created Admin User: admin@sourcebyzahid.com');
  }

  // 2. Initial Site Settings
  const defaultSettings = [
    { key: 'business_name', value: 'Source by Zahid' },
    { key: 'descriptor', value: 'China Sourcing & Machinery Procurement' },
    { key: 'tagline', value: 'Your sourcing partner on the ground in China.' },
    { key: 'whatsapp_number', value: '+86 197 1202 0155' },
    { key: 'contact_email', value: 'contact@sourcebyzahid.com' },
    { key: 'office_location', value: 'Guangzhou / Yiwu, China' },
    { key: 'hero_title', value: 'Source Products From China With a Partner on the Ground.' },
    { key: 'hero_subtitle', value: 'Source by Zahid helps international buyers research suppliers, compare quotations, coordinate samples and communicate with Chinese factories — from straightforward products to machinery projects.' },
    { key: 'pricing_disclaimer', value: 'Service fees cover sourcing and coordination work. Samples, freight, travel, testing and third-party inspections are quoted separately when required. Final scope and pricing are confirmed before work begins.' },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }

  // 3. Initial Service Packages
  const servicePackages = [
    {
      title: 'SOURCING STARTER',
      slug: 'sourcing-starter',
      priceUsd: 49.0,
      isCustomQuote: false,
      priceSuffix: 'US$49',
      badge: 'STARTER',
      features: JSON.stringify([
        'One existing product requirement',
        'Three screened supplier options',
        'Supplier pricing & MOQ breakdown',
        'Sample costs & estimated lead times',
        'One round of supplier clarification'
      ]),
      ctaText: 'Start With Starter',
      orderIndex: 1
    },
    {
      title: 'SOURCING PLUS',
      slug: 'sourcing-plus',
      priceUsd: 149.0,
      isCustomQuote: false,
      priceSuffix: 'US$149',
      badge: 'POPULAR',
      features: JSON.stringify([
        'Everything in Sourcing Starter',
        'Additional in-depth supplier screening',
        'Customization & private labeling enquiries',
        'One structured negotiation round',
        'Comparative evaluation matrix for up to 3 suppliers'
      ]),
      ctaText: 'Choose Plus',
      orderIndex: 2
    },
    {
      title: 'SAMPLE COORDINATION',
      slug: 'sample-coordination',
      priceUsd: 99.0,
      isCustomQuote: false,
      priceSuffix: 'US$99',
      badge: 'SAMPLES',
      features: JSON.stringify([
        'One target product specification',
        'Sample ordering coordination from up to 3 suppliers',
        'Local China arrival tracking & visual inspection photos',
        'One consolidated status & dispatch update'
      ]),
      ctaText: 'Coordinate Samples',
      orderIndex: 3
    },
    {
      title: 'SUPPLIER CALL',
      slug: 'supplier-call',
      priceUsd: 35.0,
      isCustomQuote: false,
      priceSuffix: 'US$35',
      badge: 'DIRECT COMMUNICATION',
      features: JSON.stringify([
        '30-minute English-Mandarin live supplier call',
        'Pre-call objective brief preparation',
        'Key technical & commercial questions answered',
        'Written action notes & summary report provided after call'
      ]),
      ctaText: 'Book Supplier Call',
      orderIndex: 4
    },
    {
      title: 'FACTORY VISIT SUPPORT',
      slug: 'factory-visit-support',
      priceUsd: null,
      isCustomQuote: true,
      priceSuffix: 'Custom Quote',
      badge: 'ON-GROUND ACCESS',
      features: JSON.stringify([
        'On-site factory visit coordination in China',
        'English-Mandarin translation & representation',
        'Visual production facility photo & video report',
        'Travel & logistics assistance'
      ]),
      ctaText: 'Request Visit Quote',
      orderIndex: 5
    },
    {
      title: 'ORDER COORDINATION',
      slug: 'order-coordination',
      priceUsd: 299.0,
      isCustomQuote: false,
      priceSuffix: 'From US$299',
      badge: 'PROCUREMENT SUPPORT',
      features: JSON.stringify([
        'One agreed purchase order & specification',
        'One selected Chinese supplier/factory',
        'Defined production milestone tracking',
        'Regular photo/video progress updates',
        'Final dispatch & export shipping coordination'
      ]),
      ctaText: 'Discuss Order Support',
      orderIndex: 6
    },
    {
      title: 'MACHINERY PROJECT SUPPORT',
      slug: 'machinery-project-support',
      priceUsd: null,
      isCustomQuote: true,
      priceSuffix: 'Custom Quote',
      badge: 'INDUSTRIAL MACHINERY',
      features: JSON.stringify([
        'Comprehensive technical requirement review',
        'Manufacturer engineering team discussions',
        'Technical quotation & configuration comparison',
        'Production & shipping project coordination'
      ]),
      ctaText: 'Discuss Machinery Requirement',
      orderIndex: 7
    }
  ];

  for (const pkg of servicePackages) {
    await prisma.servicePackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }

  // 4. Initial Product Categories
  const productCategories = [
    {
      name: 'Bags & Luggage',
      slug: 'bags-luggage',
      description: 'Handbags, travel backpacks, tactical gear, leather accessories, and custom promotional luggage from specialized Chinese manufacturers.',
      featuredImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
      seoTitle: 'China Bags & Luggage Sourcing Agent | Source by Zahid',
      seoDescription: 'Source handbags, travel luggage, and custom backpacks directly from audited Chinese suppliers with local coordination.'
    },
    {
      name: 'Outdoor & Practical Products',
      slug: 'outdoor-products',
      description: 'Camping equipment, rooftop tents, outdoor gear, folding tables, solar accessories, and selected automotive practical goods.',
      featuredImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop',
      seoTitle: 'China Outdoor & Camping Equipment Sourcing | Source by Zahid',
      seoDescription: 'Find verified Chinese outdoor product suppliers, rooftop tent manufacturers, and camping gear factories.'
    },
    {
      name: 'Automotive Accessories',
      slug: 'automotive-accessories',
      description: 'Practical automotive products, roof racks, storage boxes, protective covers, and utility car accessories.',
      featuredImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop',
      seoTitle: 'China Automotive Accessories Sourcing | Source by Zahid',
      seoDescription: 'Source practical auto accessories, roof racks, and protective utility items directly from Chinese manufacturers.'
    }
  ];

  for (const cat of productCategories) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  // 5. Initial Machinery Categories
  const machineryCategories = [
    {
      name: 'PALLET-MAKING MACHINERY',
      slug: 'pallet-making',
      overview: 'Complete industrial automated line and semi-automated machinery for producing wooden, pressed-wood, block, and molded pallets.',
      applications: 'Logistics, warehousing, export packaging, wood recycling, industrial material handling.',
      machineTypes: JSON.stringify(['Molded Wood Pallet Press Machine', 'Wooden Pallet Nailing Machine Line', 'Pallet Block Machine', 'Wood Crusher & Dryer Unit']),
      technicalSpecs: 'Production capacity: 200 - 1200 pallets/day. Material: Raw timber, recycled wood waste, sawdust. Power requirement: 380V / 50Hz 3-phase.',
      featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'BIOMASS PELLET EQUIPMENT',
      slug: 'biomass-pellet',
      overview: 'High-efficiency biomass wood pellet mills and complete pelletizing lines for converting agricultural waste into bio-energy fuel.',
      applications: 'Renewable energy plants, industrial boilers, commercial heating pellet supply, agricultural biomass processing.',
      machineTypes: JSON.stringify(['Ring Die Wood Pellet Mill', 'Flat Die Biomass Pelletizer', 'Wood Chipper & Hammer Mill', 'Pellet Cooling & Packaging Machine']),
      technicalSpecs: 'Capacity range: 1 ton/hr - 10 tons/hr line. Raw material moisture requirement: 12% - 15%. Pellet diameter: 6mm - 12mm.',
      featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'ROLL-FORMING MACHINES',
      slug: 'roll-forming',
      overview: 'Precision cold roll forming machines for producing metal roof sheets, C/Z purlins, drywall studs, shutter doors, and structural steel profiles.',
      applications: 'Construction, steel structure manufacturing, roofing material production, industrial building projects.',
      machineTypes: JSON.stringify(['Roof Sheet Roll Forming Machine', 'CZ Purlin Interchangeable Machine', 'Guardrail Roll Forming Unit', 'Door Frame Forming Line']),
      technicalSpecs: 'Forming speed: 10-25m/min. Material thickness: 0.3mm - 3.0mm GI/GL/PPGI coil. Control system: PLC with Touch Screen.',
      featuredImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop'
    }
  ];

  for (const mcat of machineryCategories) {
    await prisma.machineryCategory.upsert({
      where: { slug: mcat.slug },
      update: mcat,
      create: mcat,
    });
  }

  // 6. Initial FAQs
  const initialFaqs = [
    {
      question: 'What does the US$49 sourcing package include?',
      answer: 'The US$49 Sourcing Starter package includes research and screening for 1 existing product requirement. We identify and compare 3 suitable Chinese supplier options, providing you with direct pricing, Minimum Order Quantities (MOQ), sample costs, estimated production lead times, and 1 round of follow-up supplier clarification.',
      category: 'Packages & Pricing',
      orderIndex: 1
    },
    {
      question: 'Which products qualify for the Starter package?',
      answer: 'Standard consumer products, existing off-the-shelf catalog items, bags, outdoor accessories, standard hardware, and existing manufactured goods qualify. Highly complex custom engineering projects or heavy machinery require dedicated project scoping.',
      category: 'Packages & Pricing',
      orderIndex: 2
    },
    {
      question: 'How long does sourcing research take?',
      answer: 'Initial supplier research and pricing comparisons are typically delivered within 3 to 5 business days after receiving your complete product specifications and target parameters.',
      category: 'Process',
      orderIndex: 3
    },
    {
      question: 'Are sample costs and international shipping included in service fees?',
      answer: 'No. Service fees cover our dedicated sourcing, research, supplier communication, and coordination work. Supplier sample fees, factory tooling/customization costs, international air/sea freight, customs duties, travel expenses, and third-party inspection fees are quoted separately as required.',
      category: 'Packages & Pricing',
      orderIndex: 4
    },
    {
      question: 'Do you inspect factories and communicate in Mandarin?',
      answer: 'Yes. We are based directly on the ground in China and communicate fluently in both English and Mandarin with Chinese factory managers, sales teams, and technical engineers.',
      category: 'General',
      orderIndex: 5
    },
    {
      question: 'Can you source industrial machinery from China?',
      answer: 'Yes. We assist with technical machinery procurement including Pallet-Making Lines, Biomass Pellet Equipment, and Metal Roll-Forming Machines. We work closely with manufacturers to confirm technical specifications, output capacity, power requirements, and quotation options.',
      category: 'Machinery',
      orderIndex: 6
    },
    {
      question: 'Who pays the supplier and who holds the product supply contract?',
      answer: 'You maintain direct control. Payments for production orders are made directly by your company to the agreed supplier or manufacturer. All formal commercial invoices and supply contracts remain between your business and the supplier.',
      category: 'Payment & Contract',
      orderIndex: 7
    },
    {
      question: 'What happens if 3 suitable suppliers cannot be found?',
      answer: 'If after initial feasibility research we find that your specific product requirement cannot be matched with suitable Chinese suppliers meeting your specifications or parameters, we will notify you transparently before taking further steps.',
      category: 'Process',
      orderIndex: 8
    }
  ];

  for (const faq of initialFaqs) {
    await prisma.fAQ.create({ data: faq });
  }

  // 7. Initial Blog Posts (Sourcing Guides)
  const blogCategory = await prisma.blogCategory.upsert({
    where: { slug: 'sourcing-guides' },
    update: { name: 'Sourcing Guides' },
    create: { name: 'Sourcing Guides', slug: 'sourcing-guides' },
  });

  const initialPosts = [
    {
      title: 'How to Find Reliable Chinese Suppliers for International Business',
      slug: 'how-to-find-reliable-chinese-suppliers',
      excerpt: 'Discover practical steps for researching, screening, and validating Chinese factories without getting caught in middleman pricing traps.',
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
      content: `Sourcing products from China remains one of the most effective ways for international importers, retailers, and brand owners to scale production and expand product lines. However, navigating the Chinese supplier landscape requires clear communication, direct factory screening, and practical evaluation.

### 1. Differentiate Between Factories and Trading Companies
When searching for suppliers on platforms or via local contacts, it is crucial to identify whether you are communicating directly with a manufacturing factory or a trading company. While trading companies offer convenience and variety, direct factories generally provide better technical customization and direct pricing clarity.

### 2. Verify Supplier Capability & Business Scope
Before requesting samples or sending deposits, request the supplier's official business license (*Ying Ye Zhi Zhao*). Check their registered business scope, capital structure, and primary manufacturing categories to ensure they specialize in your target product.

### 3. Establish Clear Product Specifications Early
Misunderstandings in product dimensions, materials, color matching (Pantone), or packaging can derail production. Always document technical specifications in plain English and simplified Mandarin before requesting pricing updates.`,
      categoryId: blogCategory.id,
      author: 'Zahid',
      metaTitle: 'How to Find Reliable Chinese Suppliers | China Sourcing Guide',
      metaDescription: 'Learn how to screen Chinese suppliers, verify factory capabilities, and avoid common procurement mistakes.',
      tags: JSON.stringify(['Supplier Screening', 'China Sourcing', 'Factory Verification'])
    },
    {
      title: 'Understanding Minimum Order Quantity (MOQ) in China Sourcing',
      slug: 'understanding-moq-in-china-sourcing',
      excerpt: 'Why Chinese factories set MOQs, how to negotiate reasonable initial order volumes, and strategies for sample orders.',
      featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop',
      content: `Minimum Order Quantity (MOQ) is one of the most frequent friction points for international buyers requesting products from Chinese factories. Understanding why manufacturers enforce MOQs allows you to negotiate more effectively.

### Why Factories Set High MOQs
Chinese factories operate on volume efficiency. An MOQ is often determined by:
- **Raw Material Minimums**: The factory's material supplier may require a minimum dye run or steel tonnage.
- **Machine Setup Time**: Calibrating automated production lines takes hours; short runs increase per-unit labor costs.
- **Packaging Minimums**: Custom printed boxes often carry 1,000 to 3,000 unit minimums.

### How to Negotiate Lower Initial Orders
1. **Request Standard Colors & Off-the-Shelf Packaging**: Using standard factory stock materials eliminates raw material setup fees.
2. **Pay a Small Per-Unit Surcharge for Trial Batches**: Offer a 10-15% unit premium for an initial trial order of 200-500 units.
3. **Consolidate Product Variations**: Order multiple sizes or styles that share the same base mold or material.`,
      categoryId: blogCategory.id,
      author: 'Zahid',
      metaTitle: 'What is MOQ in China Sourcing & How to Negotiate It',
      metaDescription: 'Understand why Chinese factories set MOQs and learn proven strategies to negotiate lower initial order quantities.',
      tags: JSON.stringify(['MOQ', 'Negotiation', 'China Procurement'])
    }
  ];

  for (const post of initialPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
