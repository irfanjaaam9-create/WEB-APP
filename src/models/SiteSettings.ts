import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHeroSlide {
  imageUrl: string;
  public_id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
}

export interface INavItem {
  label: string;
  href: string;
}

export interface IHomeMetric {
  value: string;
  label: string;
}

export interface ICapabilityCard {
  title: string;
  body: string;
}

export interface IArticle {
  id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  publishedAt?: Date;
}

export interface IFAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface IServicePackage {
  id?: string;
  title: string;
  priceUsd?: number | null;
  priceSuffix?: string;
  badge?: string;
  features?: string[];
  ctaText?: string;
  isCustomQuote?: boolean;
  orderIndex?: number;
}

export interface IMachineryItem {
  id?: string;
  name: string;
  categoryId?: string;
  overview: string;
  applications?: string;
  outputCapacity?: string;
  specifications?: string;
}

export interface IMachineryCategory {
  id: string;
  name: string;
  slug: string;
  overview: string;
  featuredImage?: string;
}

export interface ISiteSettings extends Document {
  key: 'global';
  logoUrl?: string;
  heroSlides: IHeroSlide[];
  homeIntroTitle?: string;
  homeIntroBody?: string;
  capabilitiesTitle?: string;
  capabilitiesBody?: string;
  capabilitiesItems: string[];
  capabilitiesCtaText?: string;
  capabilitiesCtaLink?: string;
  homeMetrics: IHomeMetric[];
  capabilitiesImage?: string;
  capabilityCards: ICapabilityCard[];
  contactEmail: string;
  contactPhone: string;
  contactPhone2?: string;
  whatsapp: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  companyName: string;
  companyTagline: string;
  footerText: string;
  address?: string;
  officeHours?: string;
  navItems: INavItem[];
  footerLinks: INavItem[];
  blogPosts: IArticle[];
  faqs: IFAQItem[];
  servicePackages: IServicePackage[];
  machineryCatalog: IMachineryItem[];
  machineryCategories: IMachineryCategory[];
  updatedAt: Date;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    imageUrl: { type: String, required: true },
    public_id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    ctaText: { type: String, default: 'Contact Us' },
    ctaLink: { type: String, default: '/contact' },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, required: true, unique: true, default: 'global' },
    logoUrl: { type: String, default: '' },
    heroSlides: [HeroSlideSchema],
    homeIntroTitle: {
      type: String,
      default: 'Reliable manufacturing and sourcing from China for industrial equipment buyers',
    },
    homeIntroBody: {
      type: String,
      default: 'We help companies source machinery, industrial systems, and production equipment with verified factories, direct communication, and practical export support.',
    },
    capabilitiesTitle: { type: String, default: 'Reliable Manufacturing & Quality Control' },
    capabilitiesBody: {
      type: String,
      default: 'ZOY Medical Technology is a professional manufacturer engaged in the research, development, production, sale and service of PSA oxygen generators and hyperbaric oxygen chambers.',
    },
    capabilitiesItems: {
      type: [String],
      default: [
        'Turnkey Solution for Hospital Oxygen Supply',
        'CE, ISO9001, ISO13485 Certified',
        'Strict Pre-shipment Testing',
        '24/7 After-sales Support & Remote Assistance',
      ],
    },
    capabilitiesCtaText: { type: String, default: 'Learn More About Us' },
    capabilitiesCtaLink: { type: String, default: '/about' },
    homeMetrics: {
      type: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      default: [
        { value: '10+', label: 'Years Experience' },
        { value: '2000m²', label: 'Production Workshop' },
        { value: '10+', label: 'Patents' },
        { value: '30+', label: 'Countries Exported' },
      ],
    },
    capabilitiesImage: { type: String, default: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=600' },
    capabilityCards: {
      type: [
        { title: { type: String, required: true }, body: { type: String, required: true } },
      ],
      default: [
        { title: 'Modern Facility', body: 'Standardized production lines ensuring high-volume capacity.' },
        { title: 'Quality Assured', body: 'Every unit undergoes 72-hour continuous testing before delivery.' },
        { title: 'Certifications', body: 'Complying with international medical device standards.' },
      ],
    },
    contactEmail: { type: String, default: 'info@zoy-tech.com' },
    contactPhone: { type: String, default: '+86 15307600828' },
    contactPhone2: { type: String, default: '' },
    whatsapp: { type: String, default: '+86 15307600828' },
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: 'https://www.facebook.com/ZOY.Tech' },
    youtube: { type: String, default: '' },
    companyName: { type: String, default: 'ZOY Medical Technology' },
    companyTagline: { type: String, default: 'Dedicated to Oxygen Generation For 10+ Years' },
    footerText: {
      type: String,
      default: '© 2024 ZOY Medical Technology Co., Ltd. All rights reserved.',
    },
    address: {
      type: String,
      default: 'Hunan Province, China',
    },
    officeHours: {
      type: String,
      default: 'Mon - Sat: 9:00 AM - 6:00 PM (China Standard Time)',
    },
    navItems: {
      type: [
        {
          label: { type: String, default: 'Home' },
          href: { type: String, default: '/' },
        },
      ],
      default: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Cases', href: '/cases' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    footerLinks: {
      type: [
        {
          label: { type: String, default: 'Terms' },
          href: { type: String, default: '/terms' },
        },
      ],
      default: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Refund Policy', href: '/refund-policy' },
      ],
    },
    blogPosts: { type: [Object], default: [] },
    faqs: { type: [Object], default: [] },
    servicePackages: { type: [Object], default: [] },
    machineryCatalog: { type: [Object], default: [] },
    machineryCategories: { type: [Object], default: [] },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ??
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
