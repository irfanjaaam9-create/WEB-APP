import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      companyName,
      email,
      whatsApp,
      country,
      // Product
      productName,
      productUrl,
      imageUrl,
      description,
      quantity,
      targetBudget,
      deliveryDate,
      destinationCountry,
      // Machinery
      machineRequired,
      materialProcessed,
      outputCapacity,
      finishedSpecs,
      siteLocation,
      utilities,
      existingEquipment,
      integrationReqs,
      installationReqs,
      trainingReqs,
      documentationReqs,
      // Customization
      serviceRequired,
      needCustomization,
      privateLabeling,
      packagingReqs,
      technicalReqs,
      additionalMessage,
    } = body;

    if (!fullName || !email || !whatsApp || !country) {
      return NextResponse.json(
        { error: 'Contact Information (Name, Email, WhatsApp, Country) is required' },
        { status: 400 }
      );
    }

    // Generate unique Lead ID e.g. SBZ-2026-108
    const count = await prisma.lead.count();
    const leadId = `SBZ-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    const lead = await prisma.lead.create({
      data: {
        leadId,
        fullName,
        companyName: companyName || null,
        email: email.toLowerCase().trim(),
        whatsApp,
        country,

        // Product Info
        productName: productName || null,
        productUrl: productUrl || null,
        imageUrl: imageUrl || null,
        description: description || null,
        quantity: quantity || null,
        targetBudget: targetBudget || null,
        deliveryDate: deliveryDate || null,
        destinationCountry: destinationCountry || country,

        // Machinery Info
        machineRequired: machineRequired || null,
        materialProcessed: materialProcessed || null,
        outputCapacity: outputCapacity || null,
        finishedSpecs: finishedSpecs || null,
        siteLocation: siteLocation || null,
        utilities: utilities || null,
        existingEquipment: existingEquipment || null,
        integrationReqs: integrationReqs || null,
        installationReqs: installationReqs || null,
        trainingReqs: trainingReqs || null,
        documentationReqs: documentationReqs || null,

        // Customization
        serviceRequired: serviceRequired || 'Supplier Research',
        needCustomization: Boolean(needCustomization),
        privateLabeling: Boolean(privateLabeling),
        packagingReqs: packagingReqs || null,
        technicalReqs: technicalReqs || null,
        additionalMessage: additionalMessage || null,

        status: 'NEW',
      },
    });

    console.log(`[ENQUIRY SUBMITTED] Lead ID: ${leadId} from ${fullName} (${country}) for ${productName || machineRequired}`);

    return NextResponse.json({
      success: true,
      leadId: lead.leadId,
      message: 'Thank you. We’ll review your requirements and confirm whether we can help before requesting payment.',
    });
  } catch (error: any) {
    console.error('Error submitting sourcing enquiry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit sourcing enquiry' },
      { status: 500 }
    );
  }
}
