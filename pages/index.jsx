import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const steps = [
  {
    title: 'Launch SAP Fiori Launchpad Designer',
    description:
      'Open the SAP Fiori Launchpad Designer in your SAP S/4HANA or SAP Business Suite system. Use transaction /UI2/FLPD_CUST in the SAP GUI (for customizing environments) or /UI2/FLPD_CONF (for cross-client configuration). Verify that you have the SAP_UI2_ADMIN and relevant authorizations before proceeding.',
    highlights: [
      'Use the SAP GUI command field to run /UI2/FLPD_CUST, then log in with your SAP credentials.',
      'Confirm that the tile catalog and group lists are available in the left navigation panel.',
      'Check the system role (client-specific vs. cross-client) so you know whether your changes affect only your client or the entire landscape.'
    ],
    screenshot: {
      src: '/screenshots/01-launchpad-designer.svg',
      alt: 'Launchpad Designer home screen overview'
    }
  },
  {
    title: 'Create or Open a Tile Catalog',
    description:
      'Tiles live inside catalogs. If you need a fresh catalog, choose the “Create Catalog” button and provide an ID (technical name) and a meaningful title. Otherwise, open the catalog that should host your tile. Catalogs define which tiles become available for assignment to roles and groups.',
    highlights: [
      'Catalog IDs are technical identifiers (e.g., Z_FIN_APPR). Titles are user-facing; keep them descriptive.',
      'Stick with a custom namespace (Z* or Y*) so that your content is transportable and distinct from SAP-delivered objects.',
      'Add a catalog description with the intended business audience to help other administrators understand its scope.'
    ],
    screenshot: {
      src: '/screenshots/02-create-catalog.svg',
      alt: 'Creating a new catalog in Launchpad Designer'
    }
  },
  {
    title: 'Add a Static App Launcher Tile',
    description:
      'Within the selected catalog, click “+ Tile” and choose “App Launcher – Static.” Fill out Tile Title, Subtitle (optional), and Keywords. The title appears in the launchpad shell, so keep it user-friendly. Set semantic object and action placeholders—they will be tied to the target mapping later.',
    highlights: [
      'Tile title and subtitle should clearly describe the business task (e.g., “Display Vendor Line Items”).',
      'Use keywords to improve searchability in the launchpad, separating words with spaces or commas.',
      'Set an icon via the Icon tab (for example, sap-icon://Fiori2/F0115) to improve recognition.'
    ],
    screenshot: {
      src: '/screenshots/03-add-tile.svg',
      alt: 'Dialog for creating a new static tile'
    }
  },
  {
    title: 'Define Target Mapping to a Transaction Code',
    description:
      'Target mappings turn a tile tap into an action. In the catalog, switch to the “Target Mappings” tab and choose “Create Target Mapping.” Enter the same semantic object/action you used for the tile. For transaction codes, set the application type to “Transaction,” specify the SAP GUI transaction (e.g., FB03), and choose the correct target (GUI for HTML with parameter GUI=HTML if you want SAP GUI for HTML).',
    highlights: [
      'Ensure the semantic object/action is unique per destination to avoid routing conflicts.',
      'Set the Launchpad target as “Transaction” and fill the Transaction field with the desired t-code.',
      'Use parameters if the transaction requires preset values (for example, SKIP first screen = X).' 
    ],
    screenshot: {
      src: '/screenshots/04-target-mapping.svg',
      alt: 'Configuring target mapping for a tile to a tcode'
    }
  },
  {
    title: 'Assign the Tile to a Launchpad Group',
    description:
      'Groups define what tiles users actually see on their home page. Navigate to the Groups section in the launchpad designer, open an existing group, or create a new one. Use “Add Tile” and select the tile from the catalog you just configured. The tile now appears in the group layout preview.',
    highlights: [
      'Group IDs follow the same naming conventions as catalogs (use Z* or Y* for custom content).',
      'Drag and drop tiles to reorder them within the group grid for better usability.',
      'Use the visibility toggle if you want to hide the tile temporarily while still keeping the configuration.'
    ],
    screenshot: {
      src: '/screenshots/05-assign-group.svg',
      alt: 'Adding the tile to a group layout'
    }
  },
  {
    title: 'Transport and Test the Tile',
    description:
      'Save your changes and collect the catalog, tile, and target mapping into a transport request if you are in a customizing client. Assign the catalog (through a role) to the target user. Log in to the SAP Fiori Launchpad as the end user and verify that the tile opens the desired transaction code in SAP GUI for HTML or SAP GUI for Windows via SAP Business Client.',
    highlights: [
      'Use transaction /UI2/FLP_CONF_DEF to double-check the configuration if something fails to launch.',
      'Run SU24 to confirm authorization objects for the target transaction are maintained.',
      'Ask end users to clear browser cache or use “/UI2/CHIP_SYNCH” to synchronize personalized tiles if updates are missing.'
    ],
    screenshot: {
      src: '/screenshots/06-test-transport.svg',
      alt: 'Testing the tile in the SAP Fiori Launchpad'
    }
  }
];

const prerequisites = [
  'SAP Fiori Launchpad Designer access (transaction /UI2/FLPD_CUST or /UI2/FLPD_CONF).',
  'SAP Front-End Server (FES) with SAP_UI component level 7.50 or above for latest designer features.',
  'Authorizations: SAP_UI2_ADMIN, S_TCODE for target transactions, and S_RFC for Launchpad runtime as needed.',
  'Transport request if working in a customizing client and changes must move to QA/Production environments.'
];

export default function Home() {
  return (
    <>
      <Head>
        <title>SAP Fiori Tile to T-Code Guide</title>
        <meta
          name="description"
          content="Step-by-step walkthrough for creating a SAP Fiori tile and linking it to a transaction code."
        />
      </Head>
      <main className={styles.main}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>SAP HANA & Fiori Administration</p>
            <h1>Build a Fiori Tile for Your Transaction Code</h1>
            <p>
              Follow this practitioner-oriented guide to design a tile, configure its target mapping, assign it to a
              group, and verify the end-to-end launch of any SAP GUI transaction inside the SAP Fiori launchpad.
            </p>
          </div>
        </header>
        <section className={styles.section}>
          <h2>Prerequisites Checklist</h2>
          <ul className={styles.list}>
            {prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Procedure Overview</h2>
          <p>
            The workflow below mirrors how SAP administrators configure tile content in productive landscapes. Each
            stage includes context, rationale, and a visual cue so you can replicate the configuration confidently.
          </p>
        </section>
        <section className={styles.steps}>
          {steps.map((step, index) => (
            <article key={step.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.stepBadge}>Step {index + 1}</span>
                <h3>{step.title}</h3>
              </div>
              <p>{step.description}</p>
              <ul className={styles.highlights}>
                {step.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className={styles.screenshot}>
                <Image
                  src={step.screenshot.src}
                  alt={step.screenshot.alt}
                  width={960}
                  height={540}
                  priority={index === 0}
                />
                <span className={styles.caption}>{step.screenshot.alt}</span>
              </div>
            </article>
          ))}
        </section>
        <section className={styles.section}>
          <h2>Validation Tips</h2>
          <div className={styles.validationGrid}>
            <div>
              <h3>Runtime checks</h3>
              <p>
                Launch the tile on the SAP Fiori Launchpad and ensure the target transaction opens without authorization
                errors. Use the browser developer console to check for HTTP 403 or 500 responses if the tile fails.
              </p>
            </div>
            <div>
              <h3>Authorization trace</h3>
              <p>
                Run transaction ST01 or SU53 after attempting to open the tile to identify missing authorization
                objects. Adjust the assigned role and catalogs if required.
              </p>
            </div>
            <div>
              <h3>Transport sequencing</h3>
              <p>
                Transport the catalog before the group so that target mappings exist when the group is imported. Include
                PFCG role updates in the same transport wave.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
