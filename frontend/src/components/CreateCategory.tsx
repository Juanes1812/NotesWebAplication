import '../styles/create.css'
import { useState } from "react";
import { createCategory } from "../services/categoriesApi";

export const CreateCategory = () => {
    const [name, setName] = useState<string>('')
    const [color, setColor] = useState<string>('')

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCategory = { name, color };

        try {
            const createdCategory = await createCategory(newCategory);
            console.log('Category created:', createdCategory);
        } catch (error) {
            console.error('Error creating a Category:', error);
        }
    };

    return (
        <>
            <div className='containerCreate'>
                <div className='titleCreate'>Create Category</div>
                <form className="formNote" onSubmit={formSubmit}>

                    <div className="contentCreate">
                        <div className="attributeBoxNote">
                            <input
                                type="text"
                                value={name}
                                placeholder="Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="attributeBoxNote">
                            <input
                                type="text"
                                value={color}
                                placeholder="Color (#AABBCC)"
                                required
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>


                    </div>

                    <div className="buttonSubmit">
                        <button type="submit">Create Category</button>
                    </div>
                </form>

            </div>

        </>
    )
}
