// @ts-nocheck
// Standalone script - excluded from Next.js build type checking
import * as dotenv from 'dotenv';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Configuration
const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Rachel - calm, warm female voice
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio', 'narrations');

// All narration texts organized by slide
const narrations = [
  // IntroSlide (3)
  { id: 'intro-1', text: "Welcome. Quick question: How many of you have actually used AI for your business?" },
  { id: 'intro-2', text: "And be honest... did it feel generic? Like it didn't really know who you are?" },
  { id: 'intro-3', text: "Exactly. There is a reason for that gap. Let me show you." },

  // ProblemSlide (2)
  { id: 'problem-1', text: "Here is the problem. Even the smartest AI is blind to your daily operations. Click the sources to see what it's missing." },
  { id: 'problem-2', text: "Without this data, it's just a generalist. But if we bridge this gap... everything changes." },

  // HowItWorksSlide (4)
  { id: 'howitworks-1', text: "The Business Brain is more than a bridge; it's a second brain that never forgets. Select a source on the left to see how it takes raw input, processes it contextually, and updates your entire business ecosystem." },
  { id: 'howitworks-2', text: "Capturing raw input signal..." },
  { id: 'howitworks-3', text: "Correlating with client history, existing projects, and strategy..." },
  { id: 'howitworks-4', text: "Updates integrated across your business ecosystem." },

  // MissingPieceSlide (2)
  { id: 'missingpiece-1', text: "This is the solution. I call it the Business Brain. It takes your raw, unfiltered input and connects it to the AI." },
  { id: 'missingpiece-2', text: "Once connected, your AI is no longer a generic tool. It becomes a specialized partner that understands your entire business." },

  // AutomationSlide (1)
  { id: 'automation-1', text: "Imagine one voice note. Normally, that's an hour of admin work. Organizing, emailing, updating. With the Business Brain, it happens in seconds." },

  // CaseStudySlide (3)
  { id: 'casestudy-1', text: "Here is a real example. An $1,800 API leak. Normally? Panic. Stress. A ruined weekend." },
  { id: 'casestudy-2', text: "But the Business Brain detected it immediately. It ran the security protocol, rotated the keys, and analyzed the logs." },
  { id: 'casestudy-3', text: "In 20 minutes, it drafted the incident report, submitted the dispute, and secured a full refund. Zero human intervention." },

  // GraphSlide (2)
  { id: 'graph-1', text: "Businesses that fully integrate AI will win. Others simply won't be able to compete. Generic AI plateaus quickly. But when you add a Context Layer..." },
  { id: 'graph-2', text: "Your advantage compounds. It learns you. It gets smarter. The gap becomes impossible to close." },

  // StrategicSlide (2)
  { id: 'strategic-1', text: "Your AI goes from a simple assistant to a Strategic Advisor. When it knows your hires, your clients, and your finances, you can ask the big questions." },
  { id: 'strategic-2', text: "And it answers them. Not with generic advice, but with deep, contextual strategy." },

  // GuaranteeSlide (1)
  { id: 'guarantee-1', text: "The guarantee isn't a specific ROI number. It's a strategic advantage. Starting now gives you a head start that compounds daily." },

  // OfferSlide (1)
  { id: 'offer-1', text: "I'm looking for founding clients. Building this takes time to customize. In exchange for your detailed feedback, you get pricing that won't exist again. I have 5 spots available." },
];

// Generate hash from text for lookup
function hashText(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex').substring(0, 12);
}

async function generateAudio(client: ElevenLabsClient, text: string, outputPath: string): Promise<void> {
  console.log(`  Generating: ${text.substring(0, 50)}...`);

  const audio = await client.textToSpeech.convert(VOICE_ID, {
    text,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
    voiceSettings: {
      stability: 0.5,
      similarityBoost: 0.75,
      style: 0.0,
      useSpeakerBoost: true,
    },
  });

  // Convert stream to buffer and write to file
  const chunks: Uint8Array[] = [];
  for await (const chunk of audio) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  fs.writeFileSync(outputPath, buffer);
  console.log(`  ✓ Saved: ${path.basename(outputPath)}`);
}

async function main() {
  if (!API_KEY) {
    console.error('Error: ELEVENLABS_API_KEY environment variable is required');
    console.log('Usage: ELEVENLABS_API_KEY=your_key npx tsx scripts/generate-narrations.ts');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🎙️  ElevenLabs Narration Generator');
  console.log('================================');
  console.log(`Voice ID: ${VOICE_ID}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Total narrations: ${narrations.length}`);
  console.log('');

  const client = new ElevenLabsClient({ apiKey: API_KEY });

  // Build manifest
  const manifest: Record<string, { id: string; file: string; text: string }> = {};

  for (let i = 0; i < narrations.length; i++) {
    const { id, text } = narrations[i];
    const filename = `${id}.mp3`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    const textHash = hashText(text);

    console.log(`[${i + 1}/${narrations.length}] ${id}`);

    // Check if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`  ⏭️  Skipping (already exists)`);
    } else {
      try {
        await generateAudio(client, text, outputPath);
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`  ❌ Error: ${error}`);
        continue;
      }
    }

    // Add to manifest (use text hash as key for lookup)
    manifest[textHash] = { id, file: `/audio/narrations/${filename}`, text };
  }

  // Write manifest
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('');
  console.log(`✅ Manifest written: ${manifestPath}`);
  console.log('✅ All narrations generated successfully!');
}

main().catch(console.error);
