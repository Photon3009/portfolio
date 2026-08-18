import Image from "next/image";

export default function ContextGraphsArticle() {
  return (
    <article className="space-y-10 text-[#191919]/90 leading-relaxed text-base">

      {/* Hero */}
      <Image
        src="/article/context.avif"
        alt="Systems of Record, Reimagined"
        width={1200}
        height={630}
        className="w-full rounded-md border border-[#191919]/10"
        priority
      />

      <p className="text-[#191919]/70 italic">
        a natural extension of my last post on knowledge graphs, moving from facts and entities to{" "}
        <span className="text-[#191919]">decisions and context</span>.
      </p>

      {/* Pull quote */}
      <blockquote className="border-l-4 border-[#191919]/20 pl-5 italic text-[#191919]/80">
        the question isn&apos;t whether systems of record survive, they will. platforms like
        Salesforce, SAP, Workday, and ServiceNow already own enterprise data. the real question is{" "}
        <span className="not-italic font-semibold text-[#191919]">where does intelligence actually live?</span>
      </blockquote>

      {/* Section 1 */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Today&apos;s systems capture state.</h2>
        <p>Every modern enterprise platform is, at its core, a database of outcomes:</p>
        <ul className="list-disc pl-6 mt-3 space-y-1.5 text-[#191919]/80">
          <li>a deal was approved.</li>
          <li>a ticket was closed.</li>
          <li>a limit was overridden.</li>
        </ul>
        <p className="mt-4">
          What they don&apos;t capture is the <em>reasoning</em> behind those outcomes: the exceptions, the trade-offs, the precedent that someone leaned on at 2:47pm before signing
          off. That layer rarely shows up in the system of record. It lives somewhere messier.
        </p>
      </section>

      {/* Section 2: scattered context illustration */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Where the missing reasoning lives.</h2>
        <p>
          Slack threads. Email chains. Zendesk replies. Jira comments. Confluence pages. Notion
          docs. PagerDuty timelines. Hand-written call notes. And, most often, inside someone&apos;s head, retrievable only by asking nicely on a Tuesday.
        </p>

        <div className="mt-6 border border-[#191919]/10 rounded-lg p-6 bg-[#fafafa]">
          <svg viewBox="0 0 700 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Connecting lines */}
            <g stroke="#191919" strokeOpacity="0.3" strokeWidth="1.2" fill="none">
              <line x1="120" y1="60" x2="350" y2="160" />
              <line x1="120" y1="160" x2="350" y2="160" />
              <line x1="120" y1="260" x2="350" y2="160" />
              <line x1="580" y1="60" x2="350" y2="160" />
              <line x1="580" y1="160" x2="350" y2="160" />
              <line x1="580" y1="260" x2="350" y2="160" />
            </g>
            {/* Source bubbles */}
            <g fill="#fff" stroke="#191919" strokeWidth="1.4">
              <rect x="40" y="40" width="160" height="42" rx="8" />
              <rect x="40" y="140" width="160" height="42" rx="8" />
              <rect x="40" y="240" width="160" height="42" rx="8" />
              <rect x="500" y="40" width="160" height="42" rx="8" />
              <rect x="500" y="140" width="160" height="42" rx="8" />
              <rect x="500" y="240" width="160" height="42" rx="8" />
            </g>
            <g fontFamily="Georgia, serif" fontSize="14" fill="#191919" textAnchor="middle">
              <text x="120" y="66">Slack</text>
              <text x="120" y="166">email</text>
              <text x="120" y="266">Jira</text>
              <text x="580" y="66">Notion</text>
              <text x="580" y="166">PagerDuty</text>
              <text x="580" y="266">call notes</text>
            </g>
            {/* Central node */}
            <circle cx="350" cy="160" r="46" fill="#191919" />
            <text x="350" y="156" fontFamily="Georgia, serif" fontSize="14" fill="#fafafa" textAnchor="middle">
              decision
            </text>
            <text x="350" y="174" fontFamily="Georgia, serif" fontSize="11" fill="#fafafa" fillOpacity="0.7" textAnchor="middle">
              context
            </text>
          </svg>
          <p className="text-xs text-[#191919]/50 mt-3 text-center italic">
            the &quot;why&quot; of any enterprise decision is scattered across 6+ systems
          </p>
        </div>

        <p className="mt-6">
          That missing layer is exactly where AI breaks down. Give an LLM your CRM and it can tell
          you what happened. Ask it <em>why</em> the discount got approved last quarter, and the answer never lived in a queryable place.
        </p>
      </section>

      {/* New: worked example */}
      <section>
        <h2 className="text-2xl font-bold mb-3">A worked example: the discount approval.</h2>
        <p>
          Here&apos;s the pattern, concretely. Acme Corp asks for 30% off. The deal closes. Six
          months later, your AI sales-assistant tells a new rep they can offer Beta Corp the same
          deal because Acme got it. Beta is half the size, in a different segment, and was already
          willing to pay list. You just lit money on fire.
        </p>
        <p className="mt-4">What the system of record knows:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1.5 text-[#191919]/80">
          <li>Acme&apos;s contract is closed-won at 70% list price.</li>
          <li>The discount field is set to 30%.</li>
          <li>Approver: VP Sales.</li>
        </ul>
        <p className="mt-4">What the system of record doesn&apos;t know:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1.5 text-[#191919]/80">
          <li>Acme had a competing offer from a named competitor (mentioned in three Slack threads).</li>
          <li>
            The discount was justified because Acme committed to a public case study, referenced in an email and a marketing brief, not anywhere in the CRM.
          </li>
          <li>VP Sales explicitly noted &quot;don&apos;t treat this as precedent&quot; in a voice memo.</li>
          <li>Two weeks later, legal flagged a similar pricing scenario as risky.</li>
        </ul>
        <p className="mt-4">
          A context graph would carry all of that, as edges typed{" "}
          <span className="font-mono text-sm bg-[#191919]/5 px-1.5 py-0.5 rounded">justifiedBy</span>,{" "}
          <span className="font-mono text-sm bg-[#191919]/5 px-1.5 py-0.5 rounded">contradictedBy</span>,{" "}
          <span className="font-mono text-sm bg-[#191919]/5 px-1.5 py-0.5 rounded">notForPrecedent</span>.
          When the AI assistant queries &quot;is this a precedent?&quot;, it&apos;s no longer guessing. it&apos;s walking edges that say <em>no, and here&apos;s why</em>.
        </p>
      </section>

      {/* Section 3: Context Graphs */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Enter the context graph.</h2>
        <p>
          A context graph isn&apos;t a replacement for the system of record. it&apos;s an
          <span className="font-semibold"> overlay intelligence layer</span>. Think of it as a
          structured memory that sits above your existing tools and stitches together:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1.5 text-[#191919]/80">
          <li>entities, events, policies, and people</li>
          <li>connected through time, causality, and precedent</li>
          <li>capturing decision <em>traces</em>, not just final outcomes</li>
        </ul>

        <div className="mt-6 border border-[#191919]/10 rounded-lg p-6 bg-[#fafafa]">
          <svg viewBox="0 0 700 240" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Context graph layer (top) */}
            <g>
              <rect x="40" y="20" width="620" height="80" rx="10" fill="#191919" fillOpacity="0.06" stroke="#191919" strokeOpacity="0.3" strokeWidth="1.2" />
              <text x="350" y="48" fontFamily="Georgia, serif" fontSize="15" fill="#191919" textAnchor="middle" fontWeight="600">
                context graph: the &quot;why&quot;
              </text>
              <text x="350" y="72" fontFamily="Georgia, serif" fontSize="12" fill="#191919" fillOpacity="0.6" textAnchor="middle">
                decision traces, exceptions, precedent, reasoning
              </text>
              <text x="350" y="90" fontFamily="Georgia, serif" fontSize="12" fill="#191919" fillOpacity="0.6" textAnchor="middle">
                across time
              </text>
            </g>
            {/* Arrows down */}
            <g stroke="#191919" strokeOpacity="0.4" strokeWidth="1.2" fill="none">
              <line x1="160" y1="105" x2="160" y2="135" />
              <line x1="350" y1="105" x2="350" y2="135" />
              <line x1="540" y1="105" x2="540" y2="135" />
              <polygon points="156,135 164,135 160,143" fill="#191919" fillOpacity="0.4" stroke="none" />
              <polygon points="346,135 354,135 350,143" fill="#191919" fillOpacity="0.4" stroke="none" />
              <polygon points="536,135 544,135 540,143" fill="#191919" fillOpacity="0.4" stroke="none" />
            </g>
            {/* Systems of record (bottom) */}
            <g fill="#fff" stroke="#191919" strokeWidth="1.2">
              <rect x="60" y="150" width="200" height="70" rx="8" />
              <rect x="280" y="150" width="140" height="70" rx="8" />
              <rect x="440" y="150" width="200" height="70" rx="8" />
            </g>
            <g fontFamily="Georgia, serif" fontSize="13" fill="#191919" textAnchor="middle">
              <text x="160" y="180">systems of record</text>
              <text x="160" y="200" fontSize="11" fillOpacity="0.6">CRM, ERP, ITSM</text>
              <text x="350" y="180">data warehouse</text>
              <text x="350" y="200" fontSize="11" fillOpacity="0.6">truth registry</text>
              <text x="540" y="180">collaboration</text>
              <text x="540" y="200" fontSize="11" fillOpacity="0.6">Slack, email, docs</text>
            </g>
          </svg>
          <p className="text-xs text-[#191919]/50 mt-3 text-center italic">
            the context graph sits <em>above</em> existing systems. it doesn&apos;t replace them
          </p>
        </div>
      </section>

      {/* New: What's in the graph */}
      <section>
        <h2 className="text-2xl font-bold mb-3">What&apos;s actually in the graph.</h2>
        <p>
          Stripped to its essentials, a context graph models four kinds of nodes and the typed edges
          between them. The schema is small on purpose. most of the value is in the connections,
          not the node types.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <div className="border border-[#191919]/10 rounded-lg p-5 bg-white">
            <h3 className="font-semibold mb-2">Nodes</h3>
            <ul className="text-sm text-[#191919]/75 space-y-1.5">
              <li>
                <span className="font-semibold">Entities</span>: accounts, deals, tickets, people,
                products.
              </li>
              <li>
                <span className="font-semibold">Events</span>: approvals, edits, escalations,
                outages.
              </li>
              <li>
                <span className="font-semibold">Policies</span>: pricing rules, SLAs, compliance
                gates.
              </li>
              <li>
                <span className="font-semibold">Reasoning artifacts</span>: Slack threads, voice
                memos, email chains.
              </li>
            </ul>
          </div>
          <div className="border border-[#191919]/10 rounded-lg p-5 bg-white">
            <h3 className="font-semibold mb-2">Edges</h3>
            <ul className="text-sm text-[#191919]/75 space-y-1.5">
              <li>
                <span className="font-mono text-xs">justifiedBy</span>: links an outcome to its
                rationale.
              </li>
              <li>
                <span className="font-mono text-xs">contradictedBy</span>: flags conflicting
                evidence.
              </li>
              <li>
                <span className="font-mono text-xs">precededBy / followedBy</span>: temporal ordering of events.
              </li>
              <li>
                <span className="font-mono text-xs">overrides / supersededBy</span>: exception tracking.
              </li>
              <li>
                <span className="font-mono text-xs">notForPrecedent</span>: explicit precedent
                exclusion.
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-5">
          The edge schema is the moat. Anyone can dump events into a database. The hard part is
          deciding <em>what relationships matter</em> and enforcing them consistently, because the quality of the graph is bounded by the precision of its edge types.
        </p>
      </section>

      {/* New: How to build it */}
      <section>
        <h2 className="text-2xl font-bold mb-3">How you&apos;d actually build one.</h2>
        <p>
          The architecture isn&apos;t exotic. It&apos;s three layers stacked thoughtfully.
        </p>
        <ol className="list-decimal pl-6 mt-4 space-y-3 text-[#191919]/85">
          <li>
            <span className="font-semibold">Ingest from everywhere.</span> Webhooks from Slack, the
            CRM, Zendesk, Jira, PagerDuty, GitHub, your email server. The bias is broad and shallow: capture more than you think you need, you can always prune later.
          </li>
          <li>
            <span className="font-semibold">Extract reasoning with LLMs.</span> Run incoming
            messages and documents through extraction prompts that pull out entities, events, and
            candidate edges. The LLM is the <em>extractor</em>, not the <em>memory</em>.
          </li>
          <li>
            <span className="font-semibold">Persist as a graph, not as text.</span> Write extracted
            triplets into a graph database (Neo4j, Memgraph, Neptune). Every edge carries provenance (which message, which timestamp, which confidence score) so you can audit it later.
          </li>
          <li>
            <span className="font-semibold">Query with hybrid retrieval.</span> Graph traversal for
            structural questions (&quot;has this exception been approved before?&quot;), vector
            search for the natural-language texture (&quot;what was the tone of the customer&apos;s
            last email?&quot;), and an LLM on top to compose the answer.
          </li>
        </ol>
        <p className="mt-5">
          The thing that separates a real context graph from &quot;just dump everything in
          Snowflake&quot; is step 2 done seriously. Extraction with a typed schema, validated by
          rules, with explicit handling of conflicting claims, is what gives you something
          reasoning-grade rather than reporting-grade.
        </p>
      </section>

      {/* New: What this isn't */}
      <section>
        <h2 className="text-2xl font-bold mb-3">What a context graph isn&apos;t.</h2>
        <p>
          The category is new enough to get confused with adjacent things. It is not:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-[#191919]/85">
          <li>
            <span className="font-semibold">A data warehouse.</span> Warehouses model state at rest;
            context graphs model decisions and reasoning across time. Different shape, different
            queries.
          </li>
          <li>
            <span className="font-semibold">RAG over your wiki.</span> RAG retrieves passages that
            mention keywords. A context graph traverses typed edges that encode causality. RAG can
            tell you what was said; the graph can tell you what it <em>meant for</em>.
          </li>
          <li>
            <span className="font-semibold">Agent memory.</span> Mem0, Letta, Zep solve
            conversational continuity for a single agent. Context graphs solve organizational
            memory across humans, agents, and time.
          </li>
          <li>
            <span className="font-semibold">A knowledge graph.</span> KGs structure timeless facts: drugs treat diseases, companies employ people. Context graphs structure
            time-stamped reasoning: <em>why this person, this exception, this Tuesday</em>.
          </li>
        </ul>
      </section>

      {/* Highlight callout */}
      <blockquote className="border-l-4 border-[#191919] pl-5 py-2 italic text-lg text-[#191919]">
        if knowledge graphs structure <span className="font-semibold not-italic">what is true</span>,<br />
        context graphs structure <span className="font-semibold not-italic">why something was done</span>.
      </blockquote>

      {/* Section 4 */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Why incumbents struggle to build this layer.</h2>
        <p>
          Warehouses becoming truth registries and CRMs becoming state-machines-with-APIs has made
          enterprise data more accessible than ever. But that solves access, not <em>decision
          traces</em>.
        </p>
        <p className="mt-4">
          Salesforce is pushing <span className="font-semibold">Agentforce</span>, ServiceNow has{" "}
          <span className="font-semibold">Now Assist</span>, Workday is building HR agents. The
          pitch is consistent: <em>&quot;we have the data, now we add intelligence.&quot;</em>
        </p>
        <p className="mt-4">But these agents inherit two structural limits from their parents:</p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <div className="border border-[#191919]/10 rounded-lg p-5 bg-white">
            <h3 className="font-semibold mb-2">1. they only see current state.</h3>
            <p className="text-sm text-[#191919]/75">
              Salesforce knows what an opportunity looks like <em>now</em>, not what it looked like
              when the discount was approved. When a record gets edited, the justification
              evaporates. No replay. No audit. No precedent.
            </p>
          </div>
          <div className="border border-[#191919]/10 rounded-lg p-5 bg-white">
            <h3 className="font-semibold mb-2">2. they inherit blind spots.</h3>
            <p className="text-sm text-[#191919]/75">
              A real support escalation doesn&apos;t live in Zendesk alone. It depends on CRM data,
              billing SLAs, PagerDuty outages, and the Slack thread where someone said
              &quot;ship it anyway.&quot; No single system owns that.
            </p>
          </div>
        </div>
        <p className="mt-5">
          There&apos;s a third, more subtle limit too: <span className="font-semibold">incentives</span>.
          Salesforce&apos;s business is selling more Salesforce. A context graph that lets a customer
          see their data is irrelevant whether it lives in Salesforce or somewhere else, is the kind of
          thing only a startup or a neutral platform can ship without internal antibodies forming.
        </p>
      </section>

      {/* New: Hard parts */}
      <section>
        <h2 className="text-2xl font-bold mb-3">The hard parts (and they are hard).</h2>
        <p>
          A context graph is a beautiful idea on a whiteboard. In production, four problems eat most
          of the engineering budget.
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2.5 text-[#191919]/85">
          <li>
            <span className="font-semibold">Identity resolution across systems.</span> Slack&apos;s
            <span className="font-mono text-sm">U02ABCDE</span>, Salesforce&apos;s
            <span className="font-mono text-sm">003xx00000</span>, and an email address all
            sometimes refer to the same human. Stitching these into a single entity reliably is a
            classic, unglamorous problem.
          </li>
          <li>
            <span className="font-semibold">Conflicting claims.</span> Slack says one thing, the CRM
            says another, and the call notes contradict both. The graph has to express disagreement
            without collapsing it, every edge carrying provenance and confidence.
          </li>
          <li>
            <span className="font-semibold">Schema drift.</span> The org reorganizes. New deal stages
            appear. A new tool gets adopted. Your edge types from six months ago don&apos;t cover
            it. Migration is real work that ships zero new features.
          </li>
          <li>
            <span className="font-semibold">Privacy and access control.</span> Decision context
            often includes sensitive material: performance reviews, legal advice, board
            discussions. Edge-level permissions are non-trivial, and getting them wrong is the kind
            of bug that ends a company.
          </li>
        </ul>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Builder takeaways.</h2>
        <ul className="space-y-3 mt-4">
          <li className="flex gap-3">
            <span className="text-[#191919]/40 font-mono text-sm pt-0.5 shrink-0">01</span>
            <span>
              don&apos;t replace systems of record; {" "}
              <span className="font-semibold">sit above them.</span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#191919]/40 font-mono text-sm pt-0.5 shrink-0">02</span>
            <span>
              treat decision context as a{" "}
              <span className="font-semibold">first-class graph</span>, not unstructured text.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#191919]/40 font-mono text-sm pt-0.5 shrink-0">03</span>
            <span>
              use LLMs to extract reasoning, but{" "}
              <span className="font-semibold">persist memory in structure</span>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#191919]/40 font-mono text-sm pt-0.5 shrink-0">04</span>
            <span>
              the moat is{" "}
              <span className="font-semibold">cross-system decision history</span>, not the LLM,
              not the UI.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#191919]/40 font-mono text-sm pt-0.5 shrink-0">05</span>
            <span>
              <span className="font-semibold">provenance is non-negotiable.</span> every edge needs
              a source, a timestamp, and a confidence score. without that, the graph is just
              another black box.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#191919]/40 font-mono text-sm pt-0.5 shrink-0">06</span>
            <span>
              start with one decision type (pricing approvals, support escalations, hiring committees) and prove value <span className="font-semibold">narrowly</span> before
              expanding the schema.
            </span>
          </li>
        </ul>
      </section>

      {/* Closing */}
      <section className="pt-4 border-t border-[#191919]/10">
        <p className="text-[#191919]/85">
          CRMs standardized customer data. Context graphs may standardize{" "}
          <span className="font-semibold">enterprise decision-making</span>, capturing not just
          the answer, but the trail of reasoning that produced it.
        </p>
        <p className="mt-4 italic text-[#191919]/70">feels early. but foundational.</p>
      </section>
    </article>
  );
}
