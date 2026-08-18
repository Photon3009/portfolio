import Image from "next/image";

export default function KnowledgeGraphArticle() {
  return (
    <div className="space-y-10 text-[#191919]/90 leading-relaxed text-base">
      <div className="border-l-4 border-[#191919]/20 pl-4 italic text-[#191919]/80">
        <p>
          {`Can we build systems that are true domain experts, not just well-spoken generalists?`}
        </p>
      </div>

      {/* Intro */}
      <section>
        <p>
          I&apos;ve been spending time with knowledge-graph-based reasoning, and recently came across a{" "}
          <a
            href="https://arxiv.org/abs/2502.13025"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#191919]"
          >
            paper
          </a>{" "}
          that argues for a bottom-up approach to domain-specific models, grounding them in structured knowledge graphs
          rather than vast, unstructured text corpora. The more I sit with it, the more it feels like the missing layer
          beneath the LLM stack.
        </p>
        <p className="mt-4">
          We&apos;ve spent two years asking <em>how do we make LLMs smarter?</em> The answer the field has converged on
          is mostly &quot;more data, more parameters, more compute.&quot; But there&apos;s a quieter answer that keeps
          surfacing in adjacent fields (biomedical informatics, finance, regulatory tech): <em>structure the world
          first, then teach the model to reason over it.</em> That second answer is what this piece is about.
        </p>
      </section>

      {/* New: Two paradigms */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Two Paradigms, One Goal</h2>
        <p>
          Most of the discourse treats LLMs as a single thing, but there are really two competing philosophies of how
          you teach a machine to know something.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <div className="border border-[#191919]/10 rounded-lg p-5 bg-white">
            <h3 className="font-semibold mb-2">Top-down: scale + text</h3>
            <p className="text-sm text-[#191919]/75">
              Read the entire web, compress it into 70B parameters, hope competence emerges. The bet is that with enough
              data, structure is implicit in the weights. Works astonishingly well for general tasks, falls apart on the
              long tail of specialist knowledge.
            </p>
          </div>
          <div className="border border-[#191919]/10 rounded-lg p-5 bg-white">
            <h3 className="font-semibold mb-2">Bottom-up: structure + reasoning</h3>
            <p className="text-sm text-[#191919]/75">
              Curate the relationships first (diseases cause symptoms, drugs interact with proteins, regulations
              reference statutes), then train a smaller model to traverse them. The bet is that reasoning over an
              explicit structure beats pattern-matching over an implicit one in any domain that demands precision.
            </p>
          </div>
        </div>
        <p className="mt-4">
          The provocation of the recent literature is that bottom-up doesn&apos;t lose to scale. it complements it.
          You don&apos;t need a trillion-parameter model to outperform GPT-4 on medical reasoning. You need 32B
          parameters and a clean graph.
        </p>
      </section>

      {/* Where LLMs Fall Short */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Where Top-Down LLMs Fall Short</h2>
        <p>
          LLMs trained top-down on general web corpora are remarkable, but their failure modes are predictable:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Hallucination.</strong> Without explicit grounding, the model fills gaps with plausible-sounding fiction.
            In high-stakes domains (medicine, law, finance) plausibility is not enough.
          </li>
          <li>
            <strong>Shallow multi-step reasoning.</strong> Chain-of-thought helps, but the model is still navigating
            implicit relationships hidden inside its weights, not an explicit map of how concepts connect.
          </li>
          <li>
            <strong>Vector similarity is lossy.</strong> Most retrieval pipelines return only top-k chunks. The k+1th chunk (slightly less similar but factually critical) gets dropped on the floor. Unstructured text simply
            doesn&apos;t expose the deep abstractions a domain expert relies on.
          </li>
        </ul>
        <p className="mt-4">
          A graph reasons differently. It traverses explicit, named relationships between nodes, so the path from
          symptom → disease → treatment is something the system can <em>walk</em>, not approximate.
        </p>
      </section>

      {/* What a Knowledge Graph Looks Like */}
      <section>
        <h2 className="text-2xl font-bold mb-3">What a Knowledge Graph Actually Looks Like</h2>
        <p>
          A knowledge graph is a network of entities (people, drugs, diseases, papers, places) connected by typed
          relationships. Below is a class-level view of the biomedical subset of Wikidata: every node is a kind of
          thing, every edge a verifiable claim about how those things relate.
        </p>
        <div className="flex flex-col items-center space-y-2 mt-4">
          <Image
            src="/article/kg-biomedical.svg"
            alt="Class-level diagram of the biomedical knowledge graph in Wikidata"
            width={720}
            height={480}
            className="rounded border border-[#191919]/10 bg-white"
          />
          <p className="text-sm text-[#191919]/60">
            Source:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Biomedical_Knowledge_Graph_in_Wikidata.svg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#191919]"
            >
              Wikimedia Commons
            </a>
          </p>
        </div>
      </section>

      {/* New: Anatomy of a graph */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Anatomy of a Graph: Triplets, Types, Ontologies</h2>
        <p>
          A knowledge graph, stripped to its bones, is a collection of <em>triplets</em>:
          <span className="font-mono text-sm bg-[#191919]/5 px-2 py-1 rounded mx-1">(subject, predicate, object)</span>, facts in atomic form. <span className="font-mono text-sm">(aspirin, treats, headache)</span> is a triplet.
          So is <span className="font-mono text-sm">(aspirin, hasContraindication, hemophilia)</span>.
        </p>
        <p className="mt-4">
          On top of triplets sit two layers that turn a flat soup of facts into something you can reason over:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>An ontology.</strong> A schema that names the kinds of things in your world (Drug, Disease,
            Symptom, Patient) and the kinds of relationships allowed between them (treats, contraindicates, dosage).
            Without an ontology, &quot;treats&quot; and &quot;is used for&quot; become different predicates and your
            graph fragments.
          </li>
          <li>
            <strong>An inference layer.</strong> Rules and constraints that derive new edges from existing ones.
            <em> If A is a kind of B, and B treats C, then A treats C</em>, except when overridden. The graph holds
            both the facts and the entailment rules, so you don&apos;t need to enumerate every consequence.
          </li>
        </ul>
        <p className="mt-4">
          This is the part that&apos;s easy to under-appreciate. A graph isn&apos;t just <em>data</em>. it&apos;s data plus a typed grammar that tells you which questions are even askable. That grammar is what lets a small
          model punch above its weight: it doesn&apos;t need to learn that drugs treat diseases from a million sentences,
          because the schema already says so.
        </p>
      </section>

      {/* Case Study */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Case Study: QwQ-Med-3</h2>
        <p>
          The paper makes the case concretely in medicine. By fine-tuning QwQ-32B on{" "}
          <strong>24,000 tasks generated from a medical knowledge graph</strong>, the authors produced{" "}
          <em>QwQ-Med-3</em>, a model that outperforms state-of-the-art systems on the ICD-Bench evaluation suite.
        </p>
        <p className="mt-3">
          The crucial detail: the training data wasn&apos;t scraped text. It was synthesized from the graph itself: paths, multi-hop questions, entailment chains. The model learned to <em>reason like a graph</em>, not just
          to retrieve passages that mention the right keywords.
        </p>
        <p className="mt-3">
          What this means in practice: the model is being asked questions whose <em>answers it has never seen written
          down anywhere</em>, but which are derivable by walking edges. That&apos;s a fundamentally different training
          signal than next-token prediction over Reddit threads. You&apos;re teaching the model the <em>operation</em>{" "}
          of reasoning, with the graph as the curriculum.
        </p>
      </section>

      {/* New: How graph-trained models reason */}
      <section>
        <h2 className="text-2xl font-bold mb-3">How Graph-Trained Models Reason Differently</h2>
        <p>
          When a vanilla LLM answers a medical question, it&apos;s doing high-dimensional pattern matching over the
          phrasing of its training data. When a graph-trained model answers the same question, it&apos;s effectively
          executing a traversal it learned to imitate, and the traversal is auditable.
        </p>
        <p className="mt-4">
          Consider the question: <em>&quot;A 64-year-old patient on warfarin presents with a new prescription for
          ciprofloxacin. Any concerns?&quot;</em>
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Vanilla LLM path:</strong> retrieve passages discussing warfarin and ciprofloxacin together. Hope a
            relevant interaction is mentioned. Compose a fluent answer. The failure mode is plausible-but-wrong.
          </li>
          <li>
            <strong>Graph-trained path:</strong>{" "}
            <span className="font-mono text-sm">warfarin → metabolizedBy → CYP2C9</span>;{" "}
            <span className="font-mono text-sm">ciprofloxacin → inhibits → CYP2C9</span>; therefore{" "}
            <span className="font-mono text-sm">ciprofloxacin → potentiates → warfarin</span>; flag bleeding risk. The
            failure mode is silence. if a needed edge isn&apos;t in the graph, the model can say so rather than
            confabulate.
          </li>
        </ul>
        <p className="mt-4">
          That second mode is what high-stakes domains actually want. Medicine, law, finance, and compliance need
          systems that can <em>refuse to guess</em>. A confident wrong answer is worse than a flagged uncertainty,
          and graph-grounded reasoning gives you a principled way to produce the latter.
        </p>
      </section>

      {/* Historical Note */}
      <section>
        <h2 className="text-2xl font-bold mb-3">This Isn&apos;t New: Google, 2012</h2>
        <p>
          If this feels familiar, it should. In 2012 Google announced its{" "}
          <a
            href="https://blog.google/products-and-platforms/products/search/introducing-knowledge-graph-things-not/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#191919]"
          >
            Knowledge Graph
          </a>
          {" "}with a now-famous tagline:
        </p>
        <blockquote className="border-l-4 border-[#191919]/20 pl-4 italic text-[#191919]/80 my-4">
          things, not strings.
        </blockquote>
        <p>
          That was the moment search stopped being keyword matching and started being entity-centric. The graph powered
          structured fact retrieval, and was later extended with Knowledge Vault, neural matching, and BERT. The
          present LLM era didn&apos;t replace that infrastructure. it was layered on top of it.
        </p>
        <div className="flex flex-col items-center space-y-2 mt-4">
          <Image
            src="/article/kg-biodiversity.png"
            alt="A biodiversity knowledge graph by Rod Page"
            width={720}
            height={480}
            className="rounded border border-[#191919]/10 bg-white object-contain"
          />
          <p className="text-sm text-[#191919]/60">
            A biodiversity knowledge graph, Rod Page.{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Biodiversity_knowledge_graph_by_Rod_Page.png"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#191919]"
            >
              Source
            </a>
          </p>
        </div>
      </section>

      {/* Today's Wave */}
      <section>
        <h2 className="text-2xl font-bold mb-3">The Wave Forming Right Now</h2>
        <p>
          A similar shift is happening again, this time at the application layer. A few moves I&apos;ve been watching:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>
              <a
                href="https://www.narrativa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#191919]"
              >
                Narrativa
              </a>
            </strong>{" "}
            builds domain-specific KGs for finance, sports, entertainment, and weather, and uses them to power
            automated long-form journalism, including for the Wall Street Journal.
          </li>
          <li>
            <strong>
              <a
                href="https://mem0.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#191919]"
              >
                Mem0
              </a>{" "}
              and{" "}
              <a
                href="https://supermemory.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#191919]"
              >
                Supermemory
              </a>
            </strong>{" "}
            are building hybrid memory layers (graph plus vector) because pure embeddings forget the structure of
            what was said, and graphs alone forget the texture.
          </li>
          <li>
            <strong>Microsoft&apos;s GraphRAG.</strong> The research team at Microsoft published a system that builds
            community-detected knowledge graphs from arbitrary text and uses them as a retrieval substrate. On
            multi-hop questions over private corpora, it consistently outperforms vector-only RAG.
          </li>
          <li>
            <strong>LinkedIn&apos;s Economic Graph.</strong> Years before LLMs, LinkedIn was modeling members,
            companies, skills, schools, and titles as a single connected graph. Today every &quot;people you may
            know&quot;, every job match, every skill recommendation runs over that graph, not raw text.
          </li>
          <li>
            <strong>Neo4j and the graph database renaissance.</strong> Tools that were enterprise back-office
            ten years ago are suddenly the substrate for AI applications, because they&apos;re the only thing that
            cleanly answers <em>how is X connected to Y, and through whom?</em>
          </li>
        </ul>
      </section>

      {/* New: The hard parts */}
      <section>
        <h2 className="text-2xl font-bold mb-3">The Hard Parts: Why Graphs Don&apos;t Just Win</h2>
        <p>
          If graphs are so powerful, why hasn&apos;t the world converged on them? Because building a good one is
          genuinely difficult, and the difficulty is concentrated in places that don&apos;t respect a startup&apos;s
          timeline.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Curation is expensive.</strong> A high-quality biomedical KG took the community years and
            thousands of person-hours of expert review. You can&apos;t scrape it; you have to build it. The flip side
            is that once it exists, every model trained against it inherits that work.
          </li>
          <li>
            <strong>Schema evolution is brutal.</strong> The world changes: new drug classes, new regulations, new
            org structures. An ontology that was right two years ago can quietly become wrong, and migrating live data
            is the kind of work nobody volunteers for.
          </li>
          <li>
            <strong>Identity resolution.</strong> Is &quot;J. Smith&quot; in this paper the same person as
            &quot;Jane Smith, MD&quot; in that one? Cross-system entity resolution is the unglamorous core of every
            real-world graph project.
          </li>
          <li>
            <strong>Querying isn&apos;t free.</strong> Cypher and SPARQL are powerful, but you need someone fluent in them, or a layer that translates natural-language questions into traversals reliably. Both have a learning
            curve.
          </li>
        </ul>
        <p className="mt-4">
          None of these are dealbreakers. They&apos;re the reasons graph adoption looks slow if you&apos;re measuring
          quarterly, and inevitable if you&apos;re measuring decade-over-decade.
        </p>
      </section>

      {/* New: Stack */}
      <section>
        <h2 className="text-2xl font-bold mb-3">The Practical Stack: KG + Vector + LLM</h2>
        <p>
          The most useful framing I&apos;ve found is this: the three layers serve different purposes, and the best
          systems use all three.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>
            <strong>Knowledge graph</strong>: for verifiable facts, traversal, and constraints.
          </li>
          <li>
            <strong>Vector store</strong>: for fuzzy semantic recall over text the graph doesn&apos;t structure.
          </li>
          <li>
            <strong>LLM</strong>: for natural-language understanding, query translation, and synthesis of the
            retrieved structure into something a human can read.
          </li>
        </ul>
        <p className="mt-4">
          The LLM stops being the source of truth and becomes a really good interpreter sitting on top of structured
          memory. That&apos;s a much more defensible architecture than &quot;ask the model and hope.&quot;
        </p>
      </section>

      {/* Closing */}
      <section>
        <h2 className="text-2xl font-bold mb-3">A Different Shape of Superintelligence</h2>
        <p>
          The dominant narrative says scale is everything: more parameters, more tokens, more compute. The graph
          camp says something quieter: <em>structure is everything</em>. A model is only as smart as the world model
          it can reason over, and a graph is the cleanest expression of a world model we&apos;ve built so far.
        </p>
        <p className="mt-3">
          The most likely future, to me, isn&apos;t one giant generalist. It&apos;s a network of small, sharp,
          domain-expert models (each grounded in a high-quality knowledge graph) coordinated by a generalist that
          knows when to defer. That feels not just possible, but inevitable.
        </p>
        <p className="mt-3 text-[#191919]/70">
          If you&apos;re building in this space, or you think I&apos;ve got it wrong, I&apos;d love to hear it.
        </p>
      </section>
    </div>
  );
}
