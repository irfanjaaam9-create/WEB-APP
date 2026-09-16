import { NextResponse } from 'next/server';
import { getOrCreateSettings } from '@/lib/site-settings';

export async function GET() {
  try {
    const settings = await getOrCreateSettings();
    return NextResponse.json({
      companyName: settings.companyName,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      contactPhone2: settings.contactPhone2,
      whatsapp: settings.whatsapp,
      address: settings.address,
      officeHours: settings.officeHours,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load site settings' }, { status: 500 });
  }
}
