package com.beimi.web.service.repository.jpa;

import com.beimi.web.model.FqzsGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface FqzsGameRepository extends JpaRepository<FqzsGame, String> {

	public abstract List<FqzsGame> findByStatus(int status);


	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "update bm_fqzs_game p set p.status =?1 where p.id = ?2", nativeQuery = true)
	int updateStatusById(int status, int id);
}
