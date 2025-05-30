import { useState, useEffect } from 'react';
import { createNote } from '../services/notesApi.js';
import { getCategories } from '../services/categoriesApi.js';

// Structure of category
type Category = {
    id: number;
    name: string;
    color: string;
};
interface CreateNoteProps {
    refreshNotes: () => void;  // Tipamos refreshNotes aquí
}

export const CreateNote: React.FC<CreateNoteProps> = ({ refreshNotes }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [archived, setArchived] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newNote = { title, content, archived, categoryId: Number(categoryId) };

        try {
            const createdNote = await createNote(newNote);
            refreshNotes();
            console.log('Note created:', createdNote);
        } catch (error) {
            console.error('Error creating a Note:', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories();
                setCategoriesList(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <div className='containerCreate'>
                <div className='titleCreate'>Create Note</div>
                <form className="formNote" onSubmit={formSubmit}>
                    <div className='contentCreate'>

                        <div className="attributeBoxNote">
                            <input
                                type="text"
                                value={title}
                                placeholder="Title"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="attributeBoxNote">
                            <input
                                type="text"
                                value={content}
                                placeholder="Content"
                                required
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="attributeBoxNote">
                            <select
                                id="categories"
                                value={categoryId}
                                required
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select the category
                                </option>
                                {categoriesList.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                        //Dynamic color for the selection
                                        style={{ backgroundColor: category.color }}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="attributeBoxNote">
                            <label>
                                Archive note?
                                <input
                                    type="checkbox"
                                    checked={archived}
                                    onChange={(e) => setArchived(e.target.checked)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="buttonSubmit">
                        <button type="submit">Create Note</button>
                    </div>
                </form>

            </div>

        </>
    );
};
