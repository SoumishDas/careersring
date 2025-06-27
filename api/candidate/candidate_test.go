package candidate

import (
	"fmt"
	"os"
	"testing"

	"go-gin-api/db"
	"go-gin-api/models"
)

func TestCreateCandidateSQLite(t *testing.T) {
	os.Setenv("SQLITE_PATH", "./test.db")
	db.ConnectDB("sqlite3")
	defer func() {
		db.CloseDB()
		os.Remove("./test.db")
	}()

	models.MigrateDB(db.DB)

	cand := models.Candidate{EmailUID: "uid1", FullName: "John Doe"}
	cand = CreateCandidate(cand)

        if CountCandidates("") != 1 {
                t.Fatalf("expected 1 candidate, got %d", CountCandidates(""))
        }

	got, err := FindCandidateByID(fmt.Sprintf("%d", cand.ID))
	if err != nil {
		t.Fatalf("find failed: %v", err)
	}
	if got.FullName != "John Doe" {
		t.Fatalf("unexpected name: %s", got.FullName)
	}
}
