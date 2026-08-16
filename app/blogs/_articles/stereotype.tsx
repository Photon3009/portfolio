"use client";

import {
  Aside,
  BaselineBias,
  BigNumber,
  Cmd,
  CompletionAnatomy,
  LayerScrubber,
  MirrorLab,
  NegativeControl,
  Prose,
  ReadingProgress,
  Reveal,
  SaeHealth,
  SteeringScrolly,
  Term,
  TwoTests,
  HookTally,
} from "./stereotype/figures";
import {
  ContextFight,
  KnobPlate,
  LayerStack,
  MirrorPlate,
  SilentBox,
  TwoSieves,
  WrongTurn,
} from "./stereotype/illustrations";
import { DEAD, HE, SHE } from "./stereotype/data";

/* -------------------------------------------------------------------------- */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <Prose>
      <h2 className="mt-24 mb-5">{children}</h2>
    </Prose>
  );
}

function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`mb-5 ${className}`}>{children}</p>;
}

const M = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[0.88em] bg-[#F5F5DC] px-1.5 py-0.5 rounded-[3px]">
    {children}
  </span>
);

/* -------------------------------------------------------------------------- */

export default function StereotypeArticle() {
  return (
    <article className="text-[#191919]/90">
      <ReadingProgress />

      {/* ------------------------------------------------------------------ */}
      {/* the hook                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Prose>
        <P>
          Somewhere in the eighth layer of a one-billion-parameter language
          model, there is a single number that decides a mechanic is a man.
        </P>
        <P>
          I went looking for it over a weekend, on a laptop. I found it. Then I
          turned it down until the model stopped, and turned it up until the
          model started arguing with its own prompt.
        </P>
      </Prose>

      <HookTally />

      <Prose>
        <P>
          Everybody already knows language models do this. It has been
          documented since word embeddings. “Man is to computer programmer as woman
          is to homemaker” is from 2016. What nobody had shown me, in a
          way I could actually follow, was <em>where the stereotype physically
          lives</em>, and whether it is the sort of thing you can reach in and
          grab.
        </P>
        <P>
          That is a different question from “is the model biased”. It is: is the
          bias a <em>thing</em>, with an address, that you could in principle
          delete? Or is it smeared across a hundred billion weights in a way
          that means the only lever anyone will ever have is more training data?
        </P>
        <P>
          Short version, before I show my work: it has an address. And the
          address is different in every model, which turns out to be the most
          interesting thing I found.
        </P>
        <Aside>
          A note on what this is. Weekend-scale work, two small open models, one
          laptop, written up honestly, including the three attempts that failed
          and the corrupted file that quietly invalidated my first round of
          results. Every number here comes out of a saved artefact in the repo.
          I am new to mechanistic interpretability. If I have got something
          wrong, I would like to know.
        </Aside>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>First, watch it happen</H2>
      <Prose>
        <P>
          Before any of the fancy machinery, here is the behaviour, unedited. I
          give <Term def="Meta&apos;s one-billion-parameter open model, instruction-tuned for chat. Small enough to run on a laptop." href="https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct" source="hugging face">Llama-3.2-1B-Instruct</Term> a sentence about a hairdresser. The prompt
          says nothing about who this person is.
        </P>
      </Prose>

      <CompletionAnatomy />

      <Prose>
        <P>
          That last part is the whole problem in miniature. If you open the
          model at the moment it decides, the loudest thing happening inside it
          is a feature that fires on the word “up”. The stereotype is in there
          somewhere, but it is not sitting on the surface waving at you.
        </P>
        <P>
          Zoom out from one sentence to twelve prompts per group and the shape
          gets clearer. And stranger.
        </P>
      </Prose>

      <BaselineBias />

      <Prose>
        <P>
          The asymmetry surprised me. The model is emphatic that mechanics are
          men and only mildly of the opinion that nurses are women. Whatever
          this thing is, it is not a tidy symmetric “gender axis”. It leans.
        </P>
        <P>
          And the third tab matters more than it looks. Put an explicit{" "}
          <em>her</em> in the sentence and the model does the right thing, 13:1.
          It is not deaf to context. Hold onto that. It will not survive.
        </P>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>The prediction is not made where you read it</H2>

      <LayerStack />

      <Prose>
        <P>
          A transformer thinks in a stack. Every token carries a vector (2048
          numbers in this model) that each of the sixteen layers reads from and
          writes back to. The <strong><Term def="Multiply a mid-network vector by the output matrix to read what the model would say if you forced it to answer right there. Lets you watch a prediction assemble layer by layer." href="https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens" source="nostalgebraist, 2020">logit lens</Term></strong> is a cheap trick that
          lets you tap that vector at any layer and ask “what would you say if I
          made you answer right now?” Do it at every layer and you get to watch
          a prediction assemble itself.
        </P>
        <P>
          I read the model at layer 8, the midpoint. Here is what is happening
          around there.
        </P>
      </Prose>

      <LayerScrubber />

      <Prose>
        <P>
          The first four layers are just echoing the prompt back at you. Then
          there is a stretch of nothing much. Then, from layer 9 to 14, the
          answer gets built, and those are exactly the layers that hurt when
          you <Term def="Zero out one component and measure how much the output moves. A big move means that component was doing real work." href="https://en.wikipedia.org/wiki/Ablation_(artificial_intelligence)" source="wikipedia">ablate</Term> them.
        </P>
        <P>
          So layer 8 is the right place to look: late enough that the model has
          formed an opinion, early enough that the opinion has not yet been
          spent on a token. It is the model thinking, rather than the model
          talking.
        </P>
        <Aside>
          To read a <Term def="The vector each token carries through the network, 2048 numbers wide here. Every layer reads from it and writes back to it, so it works as the model&apos;s running memory for that token." href="https://transformer-circuits.pub/2021/framework/index.html" source="transformer circuits">residual stream</Term> you need a <strong><Term def="A translator that unpacks one dense activation vector into thousands of sparse slots, each ideally standing for one interpretable thing." href="https://transformer-circuits.pub/2023/monosemantic-features" source="bricken et al., 2023">sparse autoencoder</Term></strong>:{" "}
          a translator that unpacks one dense 2048-number vector into 32,768
          slots, each ideally meaning one interpretable thing, of which only a
          couple of hundred should be on at a time. The count of how many are on
          is called <strong><Term def="The number of features that are non-zero for a given input. Healthy is hundreds out of 32,768; three means the autoencoder is not running." href="https://transformer-circuits.pub/2023/monosemantic-features" source="bricken et al., 2023">L0</Term></strong>. Remember that word. It is about to ruin
          two days of my life.
        </Aside>
        <P>
          Models and autoencoders both come from{" "}
          <a
            href="https://aquin.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#191919]/25 underline-offset-2 hover:decoration-[#191919]/70"
          >
            Aquin
          </a>
          , which is the toolkit every command on this page is talking to.
        </P>
        <Cmd>{`aquin load model llama-3.2-1b     # ~2.5 GB
aquin load sae   llama-3.2-1b-l8  # 537 MB`}</Cmd>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>Three ways to not find a feature</H2>
      <Prose>
        <P>
          I tried all the obvious things first, and all of them failed. They are
          in this post because each one failed in a way I needed later.
        </P>
      </Prose>

      <WrongTurn />

      <Prose>
        <div className="space-y-5">
          <Attempt
            n={1}
            title="Compare male-job prompts against female-job prompts"
            what="Twelve prompts about mechanics and engineers, twelve about nurses and librarians, rank every feature by how differently it fires. The winner was f3432, at about a 1% difference on top of an enormous baseline, which is suspicious on its face. I projected its decoder direction onto the vocabulary to see what it was about. Junk tokens."
            lesson="If your two prompt sets differ in topic, you will find topic features. Repair-and-wiring sentences differ from clinics-and-phones sentences in a hundred ways before they differ in implied gender, and the biggest activation difference tracks the biggest difference: subject matter."
            code={`aquin feature locate --prompts locate_probes.jsonl --layer 8 --conditioning prompt
aquin feature logit --feature 3432   # → junk tokens`}
          />
          <Attempt
            n={2}
            title="Let the model sort itself"
            what="Better idea: give it a neutral “continue this story” prompt, generate a lot, then bucket the samples by whether it said “he” or “she” and compare those two piles. Right instinct. No signal, about half a percent."
            lesson="I was averaging each feature’s activation across every token position. Gender-of-the-upcoming-pronoun lives at exactly one position: the last one. Mean-pooling over ten-plus positions buries it under nine parts noise."
            code={`aquin feature locate --prompts behavior_probes.jsonl --layer 8 --conditioning behavior`}
          />
          <Attempt
            n={3}
            title="Trace eight prompts by hand"
            what="Slow and manual: trace individual prompts, pull out whatever peaks near the pronoun. I got f26265, which fired beautifully, for “his” and “her” equally. A grammatical possession feature. Telling grammar apart from stereotype turned out to be the recurring problem of the whole project. But the traces did cough up two male-only candidates: f2546 and f32258. I parked them and moved on."
            lesson="Single-prompt traces are too thin to trust on their own. Their candidates are gold later, though, as something to cross-check a systematic method against."
            code={`aquin trace --prompt "<probe>" --layer 8 --check   # × 8 probes`}
          />
        </div>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>Then I found out my instrument was broken</H2>
      <Prose>
        <P>
          This is the part that would have silently ruined everything, and the
          reason I would tell any beginner to read this section before any of
          the results.
        </P>
        <P>
          I wrote a small script that bypassed the toolkit entirely: run the
          prompts, grab the layer-8 residual at the final token, push it through
          the autoencoder, print what fires. First run:
        </P>
      </Prose>

      <SilentBox />

      <BigNumber
        value="3"
        label="active features out of 32,768. A healthy sparse autoencoder fires hundreds. Every activation-based result I had produced up to that point came from a dead instrument."
        color={DEAD}
      />

      <Prose>
        <P>
          The cause: this autoencoder was trained on <em>normalised</em> inputs.
          All 2048 dimensions shifted and scaled as <M>(x − μ) / σ</M>, with the
          statistics stored in a separate file. The toolkit had warned me at
          download time (“norm invalid in catalog storage”) and I had scrolled
          straight past it. With the statistics broken, raw residuals arrive at
          scales the encoder never saw in training and almost nothing survives
          the <Term def="The activation function that clips anything negative to zero. If inputs arrive at the wrong scale, almost nothing survives it." href="https://en.wikipedia.org/wiki/Rectifier_(neural_networks)" source="wikipedia">ReLU</Term>.
        </P>
        <P>
          <strong>It does not raise an error. It just goes quiet.</strong>
        </P>
        <P>
          And here is the genuinely nasty part. The same broken file caused the
          exact opposite failure on a different code path. My script had worked
          around it by skipping normalisation entirely. Silence. The toolkit’s
          own stats command applied the invalid statistics, and reported that
          30,688 of 32,768 features were active. A sparse autoencoder with 94%
          of its dictionary switched on.
        </P>
        <P>
          Same file. Same layer. Same twelve prompts. Three completely different
          pictures of reality:
        </P>
      </Prose>

      <SaeHealth />

      <Prose>
        <P>
          If you have done any classical ML, you have met this before. It is
          train/serve skew. You fit a <Term def="The scikit-learn tool that shifts and scales each feature to mean 0, standard deviation 1. You must reuse the training statistics at inference, or the model sees a different world." href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html" source="scikit-learn">StandardScaler</Term> during training, then
          ignore or overwrite it at inference, and your model quietly becomes a
          random number generator. The norm file <em>is</em> the StandardScaler.
        </P>
        <P>
          The fix was about fifty lines: push 200 <Term def="A standard language-modelling dataset of verified Wikipedia articles, commonly used to measure perplexity." href="https://huggingface.co/datasets/Salesforce/wikitext" source="hugging face">wikitext</Term> documents through the
          model, compute a running per-dimension mean and standard deviation
          with <Term def="A one-pass way to compute mean and variance that stays numerically stable, instead of summing squares and subtracting." href="https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance" source="wikipedia">Welford’s algorithm</Term>, write them where the framework expects them.
          L0 went from 3 to roughly 6,400. Alive.
        </P>
        <Aside>
          6,400 is still too high for a well-trained autoencoder, and I know
          why. My statistics come from wikitext, not from whatever corpus this
          thing was actually trained against. It is a reconstruction, not a
          recovery. But the features became interpretable, and as the rest of
          this post shows, causal. Good enough to keep going, and I would rather
          say that out loud than round it up.
        </Aside>
        <P>
          The transferable lesson, and the one I would tattoo on a beginner:{" "}
          <strong>check L0 before you believe a single thing an SAE tells you.</strong>{" "}
          A distribution-mismatched autoencoder fails silently in both
          directions, dead quiet or fully saturated, and one number, computed
          in one line, tells you which of those you are looking at. It is the
          difference between “the SAE disagrees with my hypothesis” and “the SAE
          is not running”.
        </P>
        <Cmd>{`aquin sae-stats --prompts your_probes.jsonl --layers 8 --topk 30
# healthy = hundreds active`}</Cmd>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>Two tests, each useless on its own</H2>
      <Prose>
        <P>
          With a working instrument I started over, and this time I built the
          search around the three lessons the failures had taught me. Matched
          templates, so the only difference between prompts is the occupation
          word. Read at the final position only, where the signal actually is.
          And the one that mattered most: <strong>two independent tests per
          feature</strong>, chosen so that they fail in different ways.
        </P>
        <ol className="list-decimal pl-6 space-y-2 mb-6 text-[#191919]/80">
          <li>
            <strong>Does it fire selectively?</strong> Thirty-six sentences of
            the form “The {"{occupation}"} said that”, identical except for the
            job: twelve female-stereotyped, twelve male-stereotyped, twelve
            neutral. Does the feature care which group it is looking at?
          </li>
          <li>
            <strong>Does it push the pronoun?</strong> Project the feature’s
            decoder direction onto the vocabulary and see whether it actually
            promotes “ he” or “ she” at the output.
          </li>
        </ol>
        <P>
          Alone, each test is a sieve with holes in it. Selectivity waves
          through anything correlated with the occupation groups, including,
          memorably, a feature about food that simply liked the word
          “dietitian”. Output push waves through every grammar feature that
          touches a pronoun without caring which one is correct.
        </P>
        <P>Switch both on and watch what is left.</P>
      </Prose>

      <TwoSieves />

      <TwoTests />

      <Prose>
        <P>
          <M>f32258</M>. Fires at 0.38 on male-stereotyped jobs against 0.03
          female and 0.16 neutral, and its decoder direction promotes “ he”. It
          is also one of the two candidates my hand traces had flagged back in
          attempt three. Two unrelated methods landing on the same feature,
          which is roughly as much reassurance as this stage of the pipeline
          ever gives you.
        </P>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>The knob</H2>

      <KnobPlate />

      <Prose>
        <P>
          Everything so far is correlation. A feature that lights up next to a
          behaviour is not the same as a feature that <em>causes</em> it, and
          the interpretability literature is full of beautiful stories that die
          the moment somebody intervenes.
        </P>
        <P>
          So: intervene. I inject{" "}
          <M>strength × decoder_direction(f32258)</M> into the layer-8 residual
          stream at every position, sweep the strength from −6 to +6, and watch
          what the model does with its pronouns.
        </P>
        <P className="text-[#191919]/55 text-[15px]">
          Scroll. Or skip the narration entirely and drag the slider. I would.
        </P>
      </Prose>

      <SteeringScrolly />

      <BigNumber
        value="15:1 → 1:1"
        label="One direction, subtracted from one layer, at a cost of 2.3% perplexity. Nothing was retrained, nothing was fine-tuned, and no pronoun was blacklisted."
      />

      <Prose>
        <P>
          But the result I keep coming back to is the third panel. Six units of
          one feature, and a model that has just read the word “her” decides to
          say “he” anyway.
        </P>
        <P>
          That reframes what the stereotype <em>is</em>. I had assumed it was a
          soft prior, something the model falls back on when the context is
          silent, the way you would guess. It is not. It is a circuit that
          competes with the evidence, and at sufficient volume it wins.
        </P>
      </Prose>

      <ContextFight />

      {/* ------------------------------------------------------------------ */}
      <H2>A knob, or a lobotomy?</H2>
      <Prose>
        <P>
          A <Term def="Borrowed from pharmacology: if the effect scales smoothly with the size of the intervention, the intervention is probably causing it rather than merely correlating with it." href="https://en.wikipedia.org/wiki/Dose%E2%80%93response_relationship" source="wikipedia">dose-response curve</Term> on the prompts you used to find the feature
          proves very little. There are two obvious ways to fool yourself here:
          a knob that only works on your own sentences, and a knob that works by
          quietly wrecking the model. Four checks.
        </P>
        <div className="grid sm:grid-cols-2 gap-3 my-8">
          <Check
            title="New sentences, same knob"
            body="A second sweep with completely different predicates reproduces the curve: 28:1 at baseline collapsing to about 1:1 at −6. It responds to the concept, not to the phrasing that found it."
          />
          <Check
            title="It still writes English"
            body="At −6 the completions stay coherent. The mechanic story shifts from “informed them” to “inform them” and carries on. That is what debiasing should look like from the inside: not pronoun suppression, just no preference."
          />
          <Check
            title="Capability cost, near zero"
            body="At the debiasing setting, factual QA is 9/10 against 10/10 unsteered, and wikitext loss goes 3.284 → 3.359. Not free. But a long way from damage."
          />
          <Check
            title="The control does nothing"
            body="f27420, the candidate that passed only one of the two tests, is flat across the entire sweep. Which is exactly what I wanted it to do."
          />
        </div>
      </Prose>

      <NegativeControl />

      <Prose>
        <P>
          That last one is the quiet punchline of the whole method. If I had
          skipped the output-push test and steered the selectivity-only
          candidates, this post would be titled{" "}
          <em>“what I learned from a failed interpretability project”</em>. One
          line of evidence handed me a loser. Two handed me a knob. The second
          test is not a formality. It is the entire difference between the two
          outcomes.
        </P>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>Then the second model did it backwards</H2>
      <Prose>
        <P>
          I ran the whole pipeline again on a different model: LFM2.5-230M,
          about a fifth the size, a different architecture, different training.
          Mostly I expected a boring confirmation.
        </P>
        <P>
          The baseline was already interesting: same direction of bias, far
          weaker. Male-stereotyped occupations sit at 3:1 against Llama’s 15:1.
          The smaller, less instruction-tuned model is the less biased one,
          which is at least consistent with the idea that some of Llama’s 15:1
          was installed after pretraining.
        </P>
        <P>
          Then discovery did something I did not expect at all. The “he”
          candidates steered terribly. The best of them did essentially
          nothing. The feature that worked came off the <em>other</em> list:{" "}
          <M>f9619</M>, a female-context feature, selective by 32×.
        </P>
      </Prose>

      <MirrorPlate />

      <MirrorLab />

      <Prose>
        <P>
          Llama encodes occupation→pronoun stereotyping with a steerable{" "}
          <span style={{ color: HE }}>male-context</span> feature. LFM2.5
          encodes the same behaviour with a steerable{" "}
          <span style={{ color: SHE }}>female-context</span> feature. Same thing
          learned, mirrored implementation.
        </P>
        <P>
          I want to be careful about how much weight that carries: n = 2 is an anecdote, not a finding. But it is enough to poke a hole in an
          assumption that runs quietly through a lot of interpretability work:
          that a canonical behaviour has a canonical encoding. “The gender
          direction”, singular.
        </P>
        <P>
          If I had only ever opened Llama, I would have written a confident
          sentence about gender bias being encoded as a maleness direction, and
          I would have been describing a property of{" "}
          <strong>that particular model’s implementation</strong>, not a
          property of the behaviour. Which means any mitigation that depends on
          the encoding (ablate direction X, clamp feature Y) has to be redone,
          from scratch, per model. That is a much less comfortable position than
          the field’s working assumption.
        </P>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>What I would tell you before you start</H2>
      <Prose>
        <ol className="space-y-5 list-none pl-0 mb-6">
          {[
            [
              "Check L0 first. Every time.",
              "Before interpreting a single thing your autoencoder says, confirm it is running on your inputs. It fails silently in both directions and it will let you publish nonsense.",
            ],
            [
              "Match everything except the one variable.",
              "“The {occupation} said that”, with only the occupation changed, found in one afternoon what topic-mixed prompt sets failed to find in two days.",
            ],
            [
              "Read where the signal is, not where it is convenient.",
              "Averaging over token positions destroyed a signal that was perfectly legible at the final one.",
            ],
            [
              "Two independent lines of evidence, or nothing.",
              "Activation contrast alone handed me a feature about food. The one-test candidate behaved like noise under steering. Only what survived both tests was causal.",
            ],
            [
              "Correlation is cheap. Turn the knob.",
              "Monotonic response to strength, on sentences you did not use to find the feature, with a capability check and a negative control. That is the line between “we found a correlate” and “we found the knob”.",
            ],
            [
              "Always run a second model.",
              "The mirror was the most interesting thing in the project and it cost one extra model run. One.",
            ],
          ].map(([t, b], i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-[13px] text-[#191919]/30 pt-1.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{t}</strong>{" "}
                <span className="text-[#191919]/75">{b}</span>
              </span>
            </li>
          ))}
        </ol>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <H2>What I cannot claim</H2>
      <Prose>
        <P>
          Two small models. One bias axis: “he” and “she”. I did not measure
          singular “they”, which in hindsight I should have, given that one of
          the debiased completions literally says “inform them”. One layer per
          model. And steering was judged mostly on next-token pronoun
          probabilities plus small QA and <Term def="How surprised the model is by real text. Lower is better; a rise means the intervention cost the model some general ability." href="https://en.wikipedia.org/wiki/Perplexity" source="wikipedia">perplexity</Term> checks, not on what happens
          over a page of generated text.
        </P>
        <P>
          The biggest one:{" "}
          <strong>I found a causal knob, not the representation.</strong> There
          is no evidence that the stereotype <em>is</em> f32258. It is a handle
          the autoencoder happened to expose, and there may well be redundant
          copies in other features and other layers, though the fact that −6
          closes the gap completely suggests this handle catches most of it, at
          least on these prompts. The clean way to settle it is to ablate f32258
          entirely and rerun discovery to see if a backup appears. That is the
          next thing I want to do.
        </P>
        <P>
          After that: a layer scan, since I only had one autoencoder per model
          and the ablation profile says the knob should exist at several nearby
          layers. Then converting steering into an actual weight edit, so the
          fix survives without an inference-time hook. And then five to ten more
          small models, to turn “the mirror” from an anecdote into a
          distribution, and to find out whether the implementation correlates
          with size, architecture, or how hard the model was instruction-tuned.
          The 15:1 versus 3:1 gap makes me suspect it does.
        </P>
      </Prose>

      {/* ------------------------------------------------------------------ */}
      <Reveal>
        <Prose>
          <blockquote className="mt-20 border-l-2 border-[#191919]/25 pl-6 text-[21px] leading-[1.6] text-[#191919]/85">
            Mechanistic interpretability rewards skepticism. Every explanation
            should survive an intervention before it earns the right to be
            called an explanation.
          </blockquote>
        </Prose>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      <Prose>
        <div className="mt-20 pt-8 border-t border-[#191919]/10 text-[14px] text-[#191919]/60 leading-relaxed space-y-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#191919]/40 block mb-1.5">
              reproduce it
            </span>
            Everything is on GitHub:{" "}
            <a
              href="https://github.com/Photon3009/stereotype-feature-steering-experiment"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#191919]"
            >
              Photon3009/stereotype-feature-steering-experiment
            </a>
, and the toolkit is{" "}
            <a
              href="https://aquin.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#191919]/25 underline-offset-2 hover:decoration-[#191919]/70"
            >
              Aquin
            </a>
            . The <M>experiment/</M> directory has the probe sets, every script
            in execution order (norm reconstruction, direct encoding, two-test
            discovery, steering sweep, robustness sweep, capability check,
            figures), and the sweep JSONs behind every number on this page.
            Total compute: a few hours on a laptop. MPS for generation, CPU for
            analysis.
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#191919]/40 block mb-1.5">
              standing on
            </span>
            No new methods here. This is existing work wired into one pipeline
            and pointed at a socially loaded behaviour.
            <ul className="mt-3 space-y-1.5">
              <Ref
                href="https://arxiv.org/abs/1607.06520"
                cite="Bolukbasi et al., 2016"
              >
                Man is to Computer Programmer as Woman is to Homemaker?
              </Ref>
              <Ref
                href="https://arxiv.org/abs/1608.07187"
                cite="Caliskan et al., 2017"
              >
                Semantics derived automatically from language corpora contain
                human-like biases (WEAT)
              </Ref>
              <Ref
                href="https://transformer-circuits.pub/2023/monosemantic-features"
                cite="Bricken et al., 2023"
              >
                Towards Monosemanticity
              </Ref>
              <Ref
                href="https://transformer-circuits.pub/2024/scaling-monosemanticity/"
                cite="Templeton et al., 2024"
              >
                Scaling Monosemanticity
              </Ref>
              <Ref
                href="https://arxiv.org/abs/2308.10248"
                cite="Turner et al., 2023"
              >
                Activation Addition, since retitled Steering Language Models
                With Activation Engineering
              </Ref>
              <Ref
                href="https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens"
                cite="nostalgebraist, 2020"
              >
                Interpreting GPT: the logit lens
              </Ref>
              <Ref
                href="https://arxiv.org/abs/2303.08112"
                cite="Belrose et al., 2023"
              >
                Eliciting Latent Predictions from Transformers with the Tuned
                Lens
              </Ref>
              <Ref
                href="https://arxiv.org/abs/2403.19647"
                cite="Marks et al., 2024"
              >
                Sparse Feature Circuits, the closest relative, and where SHIFT
                comes from
              </Ref>
            </ul>
          </div>
          <div>
            If you work on this, or you think I have got something wrong, I
            would genuinely like to hear it.
          </div>
        </div>
      </Prose>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

function Attempt({
  n,
  title,
  what,
  lesson,
  code,
}: {
  n: number;
  title: string;
  what: string;
  lesson: string;
  code: string;
}) {
  return (
    <Reveal>
      <div className="border border-[#191919]/12 rounded-[3px] overflow-hidden bg-[#F2EEE5]">
        <div className="px-4 py-2.5 border-b border-[#191919]/10 flex items-baseline gap-2.5">
          <span className="font-mono text-[11px] text-[#191919]/35">
            0{n}
          </span>
          <span className="font-medium text-[15px]">{title}</span>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[15px] text-[#191919]/75 leading-relaxed">{what}</p>
          <div className="text-[12px]">
            <Cmd>{code}</Cmd>
          </div>
          <div className="flex gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#191919]/40 font-mono pt-1.5 shrink-0">
              lesson
            </span>
            <p className="text-[15px] text-[#191919]/85 leading-relaxed">
              {lesson}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Ref({
  href,
  cite,
  children,
}: {
  href: string;
  cite: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-2.5">
      <span
        className="mt-[0.55em] h-1 w-1 rounded-full shrink-0"
        style={{ background: SHE }}
      />
      <span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[#191919]/25 underline-offset-2 hover:decoration-[#191919]/70 hover:text-[#191919]"
        >
          {children}
        </a>
        <span className="font-mono text-[11px] text-[#191919]/40 ml-1.5 whitespace-nowrap">
          {cite}
        </span>
      </span>
    </li>
  );
}

function Check({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-[#191919]/12 rounded-[3px] p-4 bg-[#F2EEE5]">
      <h3 className="font-medium mb-1 text-[15px]">{title}</h3>
      <p className="text-[13px] text-[#191919]/70 leading-relaxed">{body}</p>
    </div>
  );
}
