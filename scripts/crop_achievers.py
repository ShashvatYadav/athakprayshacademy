import os
from PIL import Image

def crop_achievers():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    media_dir = os.path.join(base_dir, "dist", "media")
    # Fallback to public/media if dist/media is not found
    if not os.path.exists(media_dir):
        media_dir = os.path.join(base_dir, "public", "media")

    out_dir = os.path.join(base_dir, "public", "generated")
    os.makedirs(out_dir, exist_ok=True)

    # 1. UP NMMS 2026 poster
    nmms_path = os.path.join(media_dir, "nmms2026Student.jpeg")
    if os.path.exists(nmms_path):
        nmms = Image.open(nmms_path)
        
        # Anurag Yadav (State Topper / District Rank 1st)
        c_anurag = nmms.crop((81, 160, 265, 390))
        c_anurag.resize((600, 750), Image.Resampling.LANCZOS).save(
            os.path.join(out_dir, "achiever-anurag-yadav.jpg"), quality=82
        )

        # Ansh Kumar Jaiswal (District Rank 27)
        c_ansh = nmms.crop((35, 560, 275, 860))
        c_ansh.resize((600, 750), Image.Resampling.LANCZOS).save(
            os.path.join(out_dir, "achiever-ansh-kumar-jaiswal.jpg"), quality=82
        )

        # Dev Chaurasiya (District Rank 37)
        c_dev = nmms.crop((335, 560, 575, 860))
        c_dev.resize((600, 750), Image.Resampling.LANCZOS).save(
            os.path.join(out_dir, "achiever-dev-chaurasiya.jpg"), quality=82
        )

        # Shubham Modanwal (District Rank 43)
        c_shubham = nmms.crop((650, 560, 890, 860))
        c_shubham.resize((600, 750), Image.Resampling.LANCZOS).save(
            os.path.join(out_dir, "achiever-shubham-modanwal.jpg"), quality=82
        )

        # Arpit Kumar Yadav (District Rank 47)
        c_arpit = nmms.crop((950, 560, 1190, 860))
        c_arpit.resize((600, 750), Image.Resampling.LANCZOS).save(
            os.path.join(out_dir, "achiever-arpit-kumar-yadav.jpg"), quality=82
        )

    # 2. JNV Navodaya Selection poster (studentachivers.jpeg)
    jnv_path = os.path.join(media_dir, "studentachivers.jpeg")
    if os.path.exists(jnv_path):
        jnv = Image.open(jnv_path)
        # Aman Yadav (JNVST Class 5 - 92/100, District Rank 49)
        c_aman = jnv.crop((230, 350, 550, 750))
        c_aman.resize((600, 750), Image.Resampling.LANCZOS).save(
            os.path.join(out_dir, "achiever-aman-yadav.jpg"), quality=82
        )

    print("Successfully generated all 6 achiever portrait crops in public/generated/")

if __name__ == "__main__":
    crop_achievers()
