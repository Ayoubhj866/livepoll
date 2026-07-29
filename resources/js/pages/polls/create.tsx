import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Plus, Trash2, CalendarClock, Ticket, Users } from "lucide-react";

/**
 * Polls/Create — form to create a new poll.
 * Visually continues the "ballot ticket" language from PollCard: a
 * perforated tear-line separates the poll's details from its options,
 * as if you were filling out a raffle stub before it gets torn in two.
 * All colors come from the shadcn theme — no custom hex values.
 */

interface PollCreateForm {
    question: string;
    description: string;
    options: string[];
    starts_at: string;
    ends_at: string;
    allow_multiple_votes: boolean;
    [key: string]: string | string[] | boolean;
}

const inputClass =
    "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow";

export default function PollsCreate() {
    const { data, setData, post, processing, errors } = useForm<PollCreateForm>({
        question: "",
        description: "",
        options: ["", ""],
        starts_at: "",
        ends_at: "",
        allow_multiple_votes: false,
    });

    const updateOption = (index: number, value: string) => {
        const next = [...data.options];
        next[index] = value;
        setData("options", next);
    };

    const addOption = () => {
        if (data.options.length >= 8) return;
        setData("options", [...data.options, ""]);
    };

    const removeOption = (index: number) => {
        if (data.options.length <= 2) return;
        setData(
            "options",
            data.options.filter((_, i) => i !== index)
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/polls", {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen w-full bg-background">
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-2">
                        <Ticket size={14} />
                        Nouveau sondage
                    </span>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Crée ton sondage</h1>
                    <p className="text-sm text-muted-foreground">
                        Remplis les détails, ajoute tes options, et partage le lien pour collecter des votes en direct.
                    </p>
                </div>

                <form onSubmit={submit} className="rounded-2xl border border-border bg-card overflow-hidden">
                    {/* Details section */}
                    <div className="p-6 space-y-5">
                        <div>
                            <label htmlFor="question" className="block text-sm font-medium text-foreground mb-1.5">
                                Question
                            </label>
                            <input
                                id="question"
                                type="text"
                                value={data.question}
                                onChange={(e) => setData("question", e.target.value)}
                                placeholder="Quel framework backend préfères-tu ?"
                                className={inputClass}
                            />
                            {errors.question && <p className="text-xs text-destructive mt-1.5">{errors.question}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
                                Description <span className="text-muted-foreground font-normal">(optionnel)</span>
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Donne un peu de contexte à tes votants..."
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                    </div>

                    {/* Perforated tear-line */}
                    <div className="relative h-0">
                        <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-background" />
                        <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-background" />
                        <div className="mx-6 border-t border-dashed border-border" />
                    </div>

                    {/* Options section */}
                    <div className="p-6 pt-7 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-foreground">Options de vote</label>
                            <span className="text-xs text-muted-foreground">{data.options.length}/8</span>
                        </div>

                        {data.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="flex-shrink-0 w-7 h-9 flex items-center justify-center text-xs font-mono text-muted-foreground">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeOption(index)}
                                    disabled={data.options.length <= 2}
                                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground transition-colors"
                                    aria-label="Supprimer l'option"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        ))}
                        {errors.options && <p className="text-xs text-destructive">{errors.options}</p>}

                        <button
                            type="button"
                            onClick={addOption}
                            disabled={data.options.length >= 8}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-40 disabled:hover:text-primary transition-colors pt-1"
                        >
                            <Plus size={15} />
                            Ajouter une option
                        </button>
                    </div>

                    {/* Perforated tear-line */}
                    <div className="relative h-0">
                        <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-background" />
                        <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-background" />
                        <div className="mx-6 border-t border-dashed border-border" />
                    </div>

                    {/* Scheduling section */}
                    <div className="p-6 pt-7 space-y-5">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1">
                            <CalendarClock size={15} className="text-muted-foreground" />
                            Planification <span className="text-muted-foreground font-normal">(optionnel)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="starts_at" className="block text-xs text-muted-foreground mb-1.5">
                                    Début
                                </label>
                                <input
                                    id="starts_at"
                                    type="datetime-local"
                                    value={data.starts_at}
                                    onChange={(e) => setData("starts_at", e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label htmlFor="ends_at" className="block text-xs text-muted-foreground mb-1.5">
                                    Fin
                                </label>
                                <input
                                    id="ends_at"
                                    type="datetime-local"
                                    value={data.ends_at}
                                    onChange={(e) => setData("ends_at", e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.allow_multiple_votes}
                                onChange={(e) => setData("allow_multiple_votes", e.target.checked)}
                                className="w-4 h-4 rounded border-input text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <span className="text-sm text-foreground flex items-center gap-1.5">
                                <Users size={14} className="text-muted-foreground" />
                                Autoriser plusieurs choix par votant
                            </span>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 p-6 pt-2 bg-muted/30">
                        <a
                            href="/polls"
                            className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Annuler
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {processing ? "Création..." : "Créer le sondage"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
